import { Repository } from "typeorm";
import { Products } from "../entities/Products";
import { dataSource } from "../../../database/data-source";

export class ProductsRepository {
  private repository: Repository<Products>;

  constructor() {
    this.repository = dataSource.getRepository(Products);
  }

  async create(
    product_name: string,
    category: string,
    price: number,
    description: string
  ): Promise<Products> {
    const products = this.repository.create({
      product_name,
      category,
      price,
      description,
    });

    await this.repository.save(products);

    return products;
  }

  async findByName(product_name: string): Promise<Products> {
    //const product = await this.repository.findOneBy({ product_name });

    const product = await this.repository.query(
      `select * from "Products" where product_name = $1`,
      [product_name]
    );

    return product;
  }

  async deleteByName(product_name: string): Promise<void> {
    await this.repository.delete({ product_name });
  }

  async findById(product_id: string): Promise<Products> {
    const user = await this.repository.findOneBy({ product_id });
    return user;
  }

  async patch(
    product_id: string,
    product_name: string,
    category: string,
    price: number,
    description: string
  ): Promise<Products> {
    const product = await this.repository.create({
      product_name,
      category,
      price,
      description,
    });

    await this.repository.update(product_id, product);

    return product;
  }
}
