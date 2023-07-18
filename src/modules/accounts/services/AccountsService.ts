import { inject, injectable } from "tsyringe";
import { AccountsRepository } from "../repositories/AccountsRepository";
import { Users } from "../entities/Users";
import { compare, hash } from "bcryptjs";
import { DefaultResponse } from "../../../global/DefaultReponse";
import { sign } from "jsonwebtoken";

@injectable()
export class AccountsService {
  constructor(
    @inject("AccountsRepository") private accountsRepository: AccountsRepository
  ) {}

  async create(
    user_name: string,
    password: string,
    email: string
  ): Promise<Users> {
    const hashPassword = await hash(password, 8);

    const userAlreadyExists = await this.accountsRepository.findByEmail(email);
    if (userAlreadyExists) {
      throw new DefaultResponse("Email already in use.", false, 400);
    }

    const user = await this.accountsRepository.create(
      user_name,
      hashPassword,
      email
    );

    return user;
  }

  async findByEmail(email: string): Promise<Users> {
    const user = await this.accountsRepository.findByEmail(email);

    if (!user) {
      throw new DefaultResponse("Email not found.", false, 400);
    }
    return user;
  }

  async deleteByEmail(email: string): Promise<void> {
    const user = await this.accountsRepository.findByEmail(email);

    if (!user) {
      throw new DefaultResponse("Email not found.", false, 400);
    }

    await this.accountsRepository.deleteByEmail(email);
  }

  async update(
    user_id: string,
    name: string,
    password: string,
    email: string
  ): Promise<Users> {
    const hashPassword = await hash(password, 8);

    const userAlreadyExists = await this.accountsRepository.findById(user_id);
    if (!userAlreadyExists) {
      throw new DefaultResponse("User not found.", false, 400);
    }

    const user = await this.accountsRepository.update(
      user_id,
      name,
      hashPassword,
      email
    );

    return user;
  }

  async authenticate(email: string, password: string): Promise<any> {
    const userAlreadyExists = await this.accountsRepository.findByEmail(email);
    if (!userAlreadyExists) {
      throw new DefaultResponse("User not found.", false, 400);
    }

    const passwordMatches = await compare(password, userAlreadyExists.password);

    if (!passwordMatches) {
      throw new DefaultResponse("Incorrect e-mail or password", false, 401);
    }

    const token = sign(
      { userName: userAlreadyExists.user_name, email: userAlreadyExists.email },
      "marceloabcde1234",
      {
        subject: userAlreadyExists.user_id,
        expiresIn: "1d",
      }
    );

    const response = {
      user: {
        name: userAlreadyExists.user_name,
        email: userAlreadyExists.email,
      },
      token,
    };

    return response;
  }
}
