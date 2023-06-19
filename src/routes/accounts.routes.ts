import { Router } from "express";
import { AccountsController } from "../modules/accounts/controllers/AccountsController";

export const accountsRoutes = Router();

const accountsController = new AccountsController();

accountsRoutes.post("/", accountsController.create);

accountsRoutes.get("/findByEmail", accountsController.findByEmail);

accountsRoutes.delete("/deleteByEmail", accountsController.deleteByEmail);

accountsRoutes.put("/:user_id/", accountsController.update);