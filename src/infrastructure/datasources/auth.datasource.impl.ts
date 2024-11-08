import { BcryptAdapter } from "../../config";
import { UserModel } from "../../data/mongodb";
import { AuthDatasource, CustomError, RegisterUserDto, UserEntity } from "../../domain";

export class AuthDatasourceImpl implements AuthDatasource {
  async register(registerUsrDto: RegisterUserDto): Promise<UserEntity> {
    const { email, password, name } = registerUsrDto;

    try {
      const exists = await UserModel.findOne({ email });
      if (exists) throw CustomError.badRequest('User already exists');

      const user = await UserModel.create({
        name,
        email,
        password: BcryptAdapter.hash(password)
      });

      await user.save();

      return new UserEntity(
        user.id,
        name,
        email,
        user.password,
        user.roles
      );

    } catch (error) {
      if (error instanceof CustomError) {
        throw error;
      }

      throw CustomError.internalServerError()
    }

  }

}