import { AuthDatasource, CustomError, RegisterUserDto, UserEntity } from "../../domain";

export class AuthDatasourceImpl implements AuthDatasource {
  async register(registerUsrDto: RegisterUserDto): Promise<UserEntity> {
    const { email, password, name } = registerUsrDto;

    try {

      // 1. Verificar si existe

      // 2. Hash contraseña

      // 3. Mapear respuesta a entidad

      return new UserEntity(
        '1',
        name,
        email,
        password,
        ['ADMIN_ROLE']
      );

    } catch (error) {

      if (error instanceof CustomError) {
        throw error;
      }

      throw CustomError.internalServerError()

    }

  }

}