import { container } from "tsyringe";
import { AccountsRepository } from "../../modules/accounts/repositories/AccountsRepository";



container.registerSingleton<AccountsRepository>("AccountsRepository", AccountsRepository)