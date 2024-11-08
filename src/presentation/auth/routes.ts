import { Router } from "express";
import { AuthController } from "./controller";
import { AuthDatasourceImpl, AuthRepositoryImpl } from "../../infrastructure";
import { BcryptAdapter } from "../../config";

export class AuthRoutes {

  static get routes(): Router {
    const router = Router();
    const datasource = new AuthDatasourceImpl();
    const authRepository = new AuthRepositoryImpl(datasource);
    const controller = new AuthController(authRepository);

    router.post('/login', (req, res) => controller.loginUser(req, res))
    router.post('/register', (req, res) => controller.registerUser(req, res))

    return router
  }
}