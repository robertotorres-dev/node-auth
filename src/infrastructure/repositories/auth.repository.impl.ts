import { AuthDatasource, RegisterUserDto, UserEntity } from "../../domain";
import { AuthRepository } from "../../domain/repositories/auth.repository";

export class AuthRepositoryImpl implements AuthRepository {
  constructor(
    private readonly authDatasource: AuthDatasource,
  ){}

  register(registerUsrDto: RegisterUserDto): Promise<UserEntity> {
    return this.authDatasource.register(registerUsrDto)
  }

}