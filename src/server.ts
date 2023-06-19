import express, { NextFunction, Request, Response } from "express";
import "express-async-errors";
import "./database/data-source";
import "./global/tsyringeContainer"
import swaggerUi from "swagger-ui-express";
import swaggerFile from "./swagger.json";
import { createConnection } from "./database/data-source";
import { DefaultResponse } from "./global/DefaultReponse";
import { routes } from "./routes";

const app = express();

app.use(express.json());

app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerFile));

app.use(routes);

app.use((error, request: Request, response: Response, next: NextFunction) => {
  if (error instanceof DefaultResponse) {
    return response.status(error.status).json(error);
  }

  return response.status(500).json({
    status: "error",
    message: `Internal server error: ${error.message}`,
  });
});

// conectar bd

createConnection();

app.listen(3333, () => {
  console.log("Application listening at port 3333");
});
