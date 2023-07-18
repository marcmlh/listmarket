import { inject, injectable } from "tsyringe";
import { ProductsRepository } from "../repositories/ProductsRepository";
import { Products } from "../entities/Products";
import { DefaultResponse } from "../../../global/DefaultReponse";

@injectable()
export class ProductsService {
  constructor(
    @inject("ProductsRepository") private productsRepository: ProductsRepository
  ) {}
  async create(
    product_name: string,
    category: string,
    price: number,
    description: string
  ): Promise<Products> {
    const productAlreadyExists = await this.productsRepository.findByName(
      product_name
    );
    if (productAlreadyExists) {
      throw new DefaultResponse("This product already exists.", false, 400);
    }

    const product = await this.productsRepository.create(
      product_name,
      category,
      price,
      description
    );

    return product;
  }

  async findByName(product_name: string): Promise<Products> {
    const product = await this.productsRepository.findByName(product_name);

    if (!product) {
      throw new DefaultResponse("Product not found.", false, 400);
    }

    return product;
  }

  async deleteByName(product_name: string): Promise<void> {
    const productAlreadyExists = await this.productsRepository.findByName(
      product_name
    );

    if (!productAlreadyExists) {
      throw new DefaultResponse("Product not found.", false, 400);
    }

    await this.productsRepository.deleteByName(product_name);
  }

  async patch(
    product_id: string,
    product_name: string,
    category: string,
    price: number,
    description: string
  ): Promise<Products> {
    const productAlreadyExists = await this.productsRepository.findById(
      product_id
    );
    if (!productAlreadyExists) {
      throw new DefaultResponse("Product not found.", false, 400);
    }

    const product = await this.productsRepository.patch(
      product_id,
      product_name,
      category,
      price,
      description
    );

    return product;
  }
}
