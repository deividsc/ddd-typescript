import { Container } from "inversify";
import { InversifyExpressServer } from "inversify-express-utils";
import "reflect-metadata";
import { TYPES } from "./application/constants/types";
import IUserReadOnlyRepository from "./application/repositories/IUserReadOnlyRepository";
import AuthServiceLocator from "./configuration/useCases/AuthServiceLocator";
import UserRepository from "./infrastructure/UserReposity";
import * as express from "express";
import * as bodyParser from "body-parser";

const container = new Container();

//set up bindings
container.bind<AuthServiceLocator>(TYPES.AuthServiceLocator).to(AuthServiceLocator);
container.bind<IUserReadOnlyRepository>(TYPES.IUserReadOnlyRepository).to(UserRepository);

const server = new InversifyExpressServer(container);
server.setConfig((application: express.Application) => {
    application.use(bodyParser.urlencoded({ extended: true }));
    application.use(bodyParser.json());
});

const app = server.build();

app.listen(5000);