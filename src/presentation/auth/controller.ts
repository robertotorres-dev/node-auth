import { Request, Response } from 'express'
import { AuthRepository, CustomError, RegisterUserDto, RegisterUserUseCase, LoginUserDto, LoginUserUseCase } from '../../domain'
import { UserModel } from '../../data/mongodb';

export class AuthController {
  //Dependency Injection
  constructor(
    private readonly authRepository: AuthRepository
  ) { }

  private handleError = (error: unknown, res: Response) => {
    if (error instanceof CustomError) {
      return res.status(error.statusCode).json({ error: error.message })
    }

    console.log(error);
    return res.status(500).json({ error: 'Internal Server Error' })
  }

  registerUser = async (req: Request, res: Response) => {
    const [error, registerUserDto] = RegisterUserDto.create(req.body);
    if (error) return res.status(400).json({ error });

    new RegisterUserUseCase(this.authRepository)
      .execute(registerUserDto!)
      .then(data => res.json(data))
      .catch(error => this.handleError(error, res));
  }

  loginUser = async (req: Request, res: Response) => {
    const [error, loginUserDto] = LoginUserDto.create(req.body);
    if (error) return res.status(400).json({ error });

    new LoginUserUseCase(this.authRepository)
      .execute(loginUserDto!)
      .then(data => res.json(data))
      .catch(error => this.handleError(error, res));
  }

  getUsers = async (req: Request, res: Response) => {
    UserModel.find()
      .then(users => {
        res.json(users)
      })
      .catch(() => res.status(500).json({ error: 'Inernal Server Error' }))
  }

}