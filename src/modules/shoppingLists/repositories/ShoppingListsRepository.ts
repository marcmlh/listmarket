import { Repository } from "typeorm";
import { ShoppingLists } from "../entities/ShoppingLists";
import { dataSource } from "../../../database/data-source";

export class ShoppingListsRepository {
  private repository: Repository<ShoppingLists>;

  constructor() {
    this.repository = dataSource.getRepository(ShoppingLists);
  }

  async create(user_id: string, list_name: string): Promise<ShoppingLists> {
    const list = this.repository.create({
      user_id,
      list_name,
    });

    await this.repository.save(list);

    return list;
  }

  async findByName(list_name: string): Promise<ShoppingLists> {
    const list = await this.repository.findOneBy({ list_name });
    return list;
  }

  async deleteByName(list_name: string): Promise<void> {
    await this.repository.delete({ list_name });
  }

  async findByUserId(user_id: string): Promise<ShoppingLists[]> {
    const lists = await this.repository.find({
      where: {
        user_id,
      },
    });

    return lists;
  }

  async findById(list_id: string): Promise<ShoppingLists> {
    const list = await this.repository.findOneBy({ list_id });
    return list;
  }

  async patch({ list_id, user_id, list_name, done }): Promise<void> {
    const list = await this.repository.create({
      list_id,
      user_id,
      list_name,
      done,
    });

    await this.repository.update("123435556", list);
  }
}
