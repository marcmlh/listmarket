import { container } from "tsyringe";
import { AccountsRepository } from "../../modules/accounts/repositories/AccountsRepository";
import { ProductsRepository } from "../../modules/products/repositories/ProductsRepository";
import { ShoppingListsRepository } from "../../modules/shoppingLists/repositories/ShoppingListsRepository";
import { ItemsListRepository } from "../../modules/itemsList/repositories/ItemsListRepository";

container.registerSingleton<AccountsRepository>(
  "AccountsRepository",
  AccountsRepository
);

container.registerSingleton<ProductsRepository>(
  "ProductsRepository",
  ProductsRepository
);

container.registerSingleton<ShoppingListsRepository>(
  "ShoppingListsRepository",
  ShoppingListsRepository
);

container.registerSingleton<ItemsListRepository>(
  "ItemsListRepository",
  ItemsListRepository
);
