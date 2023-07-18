import { inject, injectable } from "tsyringe";
import { DefaultResponse } from "../../../global/DefaultReponse";
import jsonpatch from "jsonpatch";
import { ItemsList } from "../entities/ItemsList";
import { ItemsListRepository } from "../repositories/ItemsListRepository";
import { ProductsRepository } from "../../products/repositories/ProductsRepository";

@injectable()
export class ItemsListService {
  constructor(
    @inject("ItemsListRepository")
    private itemsListRepository: ItemsListRepository,
    @inject("ProductsRepository")
    private productsRepository: ProductsRepository
  ) {}

  async create(
    list_id: string,
    product_id: string,
    quantity: number
  ): Promise<ItemsList> {
    const product = await this.productsRepository.findById(product_id);

    const total = quantity * product.price;

    const itemAlreadyExists = await this.itemsListRepository.findByIds(
      list_id,
      product_id
    );

    if (itemAlreadyExists) {
      const itemToUpdate = {
        itemList_id: itemAlreadyExists.itemList_id,
        list_id,
        product_id,
        product_name: itemAlreadyExists.product_name,
        unit_price: itemAlreadyExists.unit_price,
        quantity: itemAlreadyExists.quantity + quantity,
        total: itemAlreadyExists.total + total,
      };

      await this.itemsListRepository.patch(itemToUpdate);

      return itemToUpdate;
    }

    const item = await this.itemsListRepository.create({
      list_id,
      product_id,
      product_name: product.product_name,
      unit_price: product.price,
      quantity,
      total,
    });

    return item;
  }

  async findByListId(list_id: string): Promise<ItemsList[]> {
    const items = await this.itemsListRepository.findByListId(list_id);

    if (!items) {
      return [];
    }

    return items;
  }

  async deleteByItemListId(itemList_id: string): Promise<void> {
    const itemAlreadyExists = await this.itemsListRepository.findByItemListId(
      itemList_id
    );

    if (!itemAlreadyExists) {
      throw new DefaultResponse("Item not found.", false, 400);
    }

    await this.itemsListRepository.deleteByItemListId(itemList_id);
  }

  async patch(itemList_id: string, operations: any[]): Promise<ItemsList> {
    const itemAlreadyExists = await this.itemsListRepository.findByItemListId(
      itemList_id
    );

    if (!itemAlreadyExists) {
      throw new DefaultResponse("Item not found.", false, 400);
    }

    const patchedItem = jsonpatch.apply_patch(itemAlreadyExists, operations);

    await this.itemsListRepository.patch(patchedItem);

    return patchedItem;
  }
}
