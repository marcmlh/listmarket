import { Column, Entity, PrimaryColumn } from "typeorm";
import { v4 as uuidV4 } from "uuid";

@Entity("ShoppingLists")
export class ShoppingLists {
  constructor() {
    if (!this.list_id) {
      this.list_id = uuidV4();
    }
  }

  @PrimaryColumn()
  list_id: string;

  @Column()
  user_id: string;

  @Column()
  list_name: string;

  @Column()
  done: boolean;
}
