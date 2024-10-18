import { Request, Response } from 'express'
import { AuthRepository, RegisterUserDto } from '../../domain'

export class AuthController {

  //Dependency Injection
  constructor(
    private readonly authRepository: AuthRepository
  ) {

  }

  registerUser = async (req: Request, res: Response) => {
    const [error, registerUserDto] = RegisterUserDto.create(req.body);
    if (error) return res.status(400).json({ error });

    this.authRepository.register(registerUserDto!)
      .then(user => res.json(user))
      .catch( error => res.status(500).json(error));
  }

  loginUser = async (req: Request, res: Response) => {
    res.json('login user controller');
  }
}