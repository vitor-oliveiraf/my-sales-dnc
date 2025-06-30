import "reflect-metadata";
import "express-async-errors"; // Intercepta erros da aplicação
import cors from "cors";
import express from "express";
import { errors } from "celebrate";

import routes from "./routes";
import ErrorHandleMiddleware from "../../middlewares/ErrorHandleMiddleware";
import { AppDataSource } from "../../infra/typeorm/data-source";
import rateLimiter from "../../middlewares/rateLimiter";

AppDataSource.initialize()
  .then(async () => {
    const app = express();

    app.use(cors());
    app.use(express.json());

    app.use(rateLimiter);
    app.use(routes);
    app.use(errors());
    app.use(ErrorHandleMiddleware.handleError);

    console.log("Conectado ao banco de dados! 🚀");

    app.listen(3333, () => {
      console.log("Servidor rodando na porta 3333! 🚀");
    });
  })
  .catch((error) => console.log("Falha ao conectar ao banco de dados", error));
