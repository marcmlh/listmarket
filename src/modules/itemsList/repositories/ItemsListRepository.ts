import { Repository } from "typeorm";
import { dataSource } from "../../../database/data-source";
import { ItemsList } from "../entities/ItemsList";

interface CreateParams {
  list_id: string;
  product_id: string;
  product_name: string;
  unit_price: number;
  quantity: number;
  total: number;
}

export class ItemsListRepository {
  private repository: Repository<ItemsList>;

  constructor() {
    this.repository = dataSource.getRepository(ItemsList);
  }

  async create(params: CreateParams): Promise<ItemsList> {
    const { list_id, product_id, product_name, unit_price, quantity, total } =
      params;

    const item = this.repository.create({
      list_id,
      product_id,
      product_name,
      unit_price,
      quantity,
      total,
    });

    await this.repository.save(item);

    return item;
  }

  async findByItemListId(itemList_id: string): Promise<ItemsList> {
    const item = await this.repository.findOneBy({ itemList_id });
    return item;
  }

  async findByIds(list_id: string, product_id: string): Promise<ItemsList> {
    const item = await this.repository.findOneBy({ list_id, product_id });
    return item;
  }

  async deleteByItemListId(itemList_id: string): Promise<void> {
    await this.repository.delete({ itemList_id });
  }

  async findByListId(list_id: string): Promise<ItemsList[]> {
    const items_list = await this.repository.find({
      where: {
        list_id,
      },
    });

    return items_list;
  }

  async patch({
    itemList_id,
    list_id,
    product_id,
    quantity,
    total,
  }): Promise<void> {
    const item = await this.repository.create({
      itemList_id,
      list_id,
      product_id,
      quantity,
      total,
    });

    await this.repository.update(itemList_id, item);
  }
}
