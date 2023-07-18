import { inject, injectable } from "tsyringe";
import { DefaultResponse } from "../../../global/DefaultReponse";
import { ShoppingListsRepository } from "../repositories/ShoppingListsRepository";
import { ShoppingLists } from "../entities/ShoppingLists";
import jsonpatch from "jsonpatch"

@injectable()
export class ShoppingListsService {
  constructor(
    @inject("ShoppingListsRepository")
    private shoppingListsRepository: ShoppingListsRepository
  ) {}

  async create(
    user_id: string,
    list_name: string,
  ): Promise<ShoppingLists> {
    const listAlreadyExists = await this.shoppingListsRepository.findByName(
      list_name
    );
    if (listAlreadyExists) {
      throw new DefaultResponse("This list already exists.", false, 400);
    }

    const list = await this.shoppingListsRepository.create(
      user_id,
      list_name
    );

    return list;
  }

  async findByName(list_name: string): Promise<ShoppingLists> {
    const list = await this.shoppingListsRepository.findByName(list_name);

    if (!list) {
      throw new DefaultResponse("List not found.", false, 400);
    }

    return list;
  }

  async findByUserId(user_id: string): Promise<ShoppingLists[]> {
    const lists = await this.shoppingListsRepository.findByUserId(user_id);

    if (!lists) {
      return [];
    }

    return lists;
  }

  async deleteByName(list_name: string): Promise<void> {
    const listAlreadyExists = await this.shoppingListsRepository.findByName(
      list_name
    );

    if (!listAlreadyExists) {
      throw new DefaultResponse("List not found.", false, 400);
    }

    await this.shoppingListsRepository.deleteByName(list_name);
  }

  async patch(
    list_id: string,
    operations: any[],
  ): Promise<ShoppingLists> {
    const listAlreadyExists = await this.shoppingListsRepository.findById(
      list_id
    );

    if (!listAlreadyExists) {
      throw new DefaultResponse("List not found.", false, 400);
    }

    const patchedList = jsonpatch.apply_patch(listAlreadyExists, operations)

    await this.shoppingListsRepository.patch(patchedList)

    return patchedList;
  }
}
