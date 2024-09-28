import { Router } from "express";
import { AuthController } from "./controller";

export class AuthRoutes {

  static get routes(): Router {
    const router = Router();
    const controller = new AuthController();

    router.post('/login', (req, res) => controller.loginUser(req, res))
    router.post('/register', (req, res) => controller.registerUser(req, res))

    return router
  }
}