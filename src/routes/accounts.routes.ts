import { Router } from "express";
import { AccountsController } from "../modules/accounts/controllers/AccountsController";
import { ensureAuthenticate } from "../middlewares/ensureAuthenticate";

export const accountsRoutes = Router();

const accountsController = new AccountsController();

accountsRoutes.post("/", accountsController.create);

accountsRoutes.get(
  "/findByEmail",
  ensureAuthenticate,
  accountsController.findByEmail
);

accountsRoutes.delete(
  "/deleteByEmail",
  ensureAuthenticate,
  accountsController.deleteByEmail
);

accountsRoutes.put("/:user_id/", ensureAuthenticate, accountsController.update);

accountsRoutes.post(
  "/authenticate",
  accountsController.authenticate
);
