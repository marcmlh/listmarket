import express, { NextFunction, Request, Response } from "express";
import swaggerUi from "swagger-ui-express";
import swaggerFile from "./swagger.json";
import { AppError } from "./helpers/AppError";
import { createConnection } from "./database/data-source";

const app = express();

app.use(express.json()); 

app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerFile));

app.use(
  (error, request: Request, response: Response, next: NextFunction) => {
    if (error instanceof AppError) {
      return response.status(error.statusCode).json({
        message: error.message,
      });
    }

    return response.status(500).json({
      status: "error",
      message: `Internal server error: ${error.message}`,
    });
  }
);

// conectar bd

createConnection()

app.listen(3333, ()=>{console.log("Application listening at port 3333")});