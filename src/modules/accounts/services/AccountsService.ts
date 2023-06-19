import { inject, injectable } from "tsyringe";
import { AccountsRepository } from "../repositories/AccountsRepository";
import { Users } from "../entities/Users";
import { hash } from "bcryptjs";
import { DefaultResponse } from "../../../global/DefaultReponse";

@injectable()
export class AccountsService {
  constructor(
    @inject("AccountsRepository") private accountsRepository: AccountsRepository
  ) {}

  async create(name: string, password: string, email: string): Promise<Users> {
    const hashPassword = await hash(password, 8);

    const userAlreadyExists = await this.accountsRepository.findByEmail(email)
    if (userAlreadyExists){
        throw new DefaultResponse ("Email already in use.", false, 400)
    }

    const user = await this.accountsRepository.create(
      name,
      hashPassword,
      email
    );

    return user;
  }

  async findByEmail(email:string): Promise<Users> {
    const user = await this.accountsRepository.findByEmail(email)

    if(!user) {
        throw new DefaultResponse("Email not found.", false, 400)
    }
    return user
  }

  async deleteByEmail(email:string): Promise<void> {
    const user = await this.accountsRepository.findByEmail(email)

    if(!user) {
        throw new DefaultResponse("Email not found.", false,400)
    }

    await this.accountsRepository.deleteByEmail(email)
  }
  
  async update(user_id: string, name: string, password: string, email: string): Promise<Users> {
    const hashPassword = await hash(password, 8);

    const userAlreadyExists = await this.accountsRepository.findById(user_id)
    if (!userAlreadyExists){
        throw new DefaultResponse ("User not found.", false, 400)
    }

    const user = await this.accountsRepository.update(
      user_id,
      name,
      hashPassword,
      email
    );

    return user;
  }
}
