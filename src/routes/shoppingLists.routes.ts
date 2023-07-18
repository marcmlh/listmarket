import { Router } from "express";
import { ensureAuthenticate } from "../middlewares/ensureAuthenticate";
import { ShoppingListsController } from "../modules/shoppingLists/controllers/ShoppingListsController";

export const shoppingListsRoutes = Router();

const shoppingListsController = new ShoppingListsController();

shoppingListsRoutes.post(
  "/",
  ensureAuthenticate,
  shoppingListsController.create
);

shoppingListsRoutes.get(
  "/findByName",
  ensureAuthenticate,
  shoppingListsController.findByName
);

shoppingListsRoutes.get(
  "/findByUserId",
  ensureAuthenticate,
  shoppingListsController.findByUserId
);

shoppingListsRoutes.delete(
  "/deleteByName",
  ensureAuthenticate,
  shoppingListsController.deleteByName
);

shoppingListsRoutes.patch(
  "/:list_id/",
  ensureAuthenticate,
  shoppingListsController.patch
);
