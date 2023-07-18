import { Router } from "express";
import { accountsRoutes } from "./accounts.routes";
import { productsRoutes } from "./products.routes";
import { shoppingListsRoutes } from "./shoppingLists.routes";
import { itemsListRoutes } from "./itemsList.routes";

export const routes = Router();

routes.use("/accounts", accountsRoutes);

routes.use("/products", productsRoutes);

routes.use("/shoppingLists", shoppingListsRoutes);

routes.use("/itemsList", itemsListRoutes);
