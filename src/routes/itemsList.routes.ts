import { Router } from "express";
import { ensureAuthenticate } from "../middlewares/ensureAuthenticate";
import { ItemsListController } from "../modules/itemsList/controllers/ItemsListController";

export const itemsListRoutes = Router();

const itemsListController = new ItemsListController();

itemsListRoutes.post("/", ensureAuthenticate, itemsListController.create);

itemsListRoutes.get(
  "/findByListId",
  ensureAuthenticate,
  itemsListController.findByListId
);

itemsListRoutes.delete(
  "/deleteByItemListId",
  ensureAuthenticate,
  itemsListController.deleteByItemListId
);

itemsListRoutes.put("/patch", ensureAuthenticate, itemsListController.patch);
