import { Router } from "express";
import { accountsRoutes } from "./accounts.routes";

export const routes = Router();

routes.use("/accounts", accountsRoutes);
