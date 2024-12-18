import { AuthDatasource, RegisterUserDto, UserEntity, LoginUserDto } from "../../domain";
import { AuthRepository } from "../../domain/repositories/auth.repository";

export class AuthRepositoryImpl implements AuthRepository {
  constructor(
    private readonly authDatasource: AuthDatasource,
  ){}
  login(loginUserDto: LoginUserDto): Promise<UserEntity> {
    return this.authDatasource.login(loginUserDto)
  }

  register(registerUserDto: RegisterUserDto): Promise<UserEntity> {
    return this.authDatasource.register(registerUserDto)
  }

}