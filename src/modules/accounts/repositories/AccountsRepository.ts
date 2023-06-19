import { Repository } from "typeorm";
import { Users } from "../entities/Users";
import { dataSource } from "../../../database/data-source";

export class AccountsRepository {
  private repository: Repository<Users>;

  constructor() {
    this.repository = dataSource.getRepository(Users);
  }

  async create(name: string, password: string, email: string): Promise<Users> {
    const user = this.repository.create({
      name,
      password,
      email,
    });

    await this.repository.save(user);

    return user;
  }

  async findByEmail(email: string): Promise<Users> {
    const user = await this.repository.findOneBy({ email });
    return user;
  }

  async deleteByEmail(email: string): Promise<void> {
  await this.repository.delete( {email} );
  }

  async update(id: string, name: string, password: string, email: string): Promise<Users> {
    const user = this.repository.create({
      name,
      password,
      email,
    });

    await this.repository.update(id,user);

    return user;
  }

  async findById(user_id: string): Promise<Users> {
    const user = await this.repository.findOneBy({user_id});
    return user
  }
}
