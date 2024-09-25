import { Request, Response } from 'express'

export class AuthController {

  //Dependency Injection
  constructor() {

  }

  registerUser = async (req: Request, res: Response) => {
    res.json('register user controller')

  }

  loginUser = async (req: Request, res: Response) => {
    res.json('login user controller')

  }
}