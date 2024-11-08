import { BcryptAdapter } from "../../config";
import { UserModel } from "../../data/mongodb";
import { AuthDatasource, CustomError, RegisterUserDto, UserEntity } from "../../domain";
import { UserMapper } from "../mappers/user.mapper";

type HashFunction = (password: string) => string
type CompareFunction = (password: string, hashedPassword: string) => boolean

export class AuthDatasourceImpl implements AuthDatasource {
  constructor(
    private readonly hashPassword: HashFunction = BcryptAdapter.hash,
    private readonly comparePassword: CompareFunction = BcryptAdapter.compare
  ) { }


  async register(registerUsrDto: RegisterUserDto): Promise<UserEntity> {
    const { email, password, name } = registerUsrDto;

    try {
      const exists = await UserModel.findOne({ email });
      if (exists) throw CustomError.badRequest('User already exists');

      const user = await UserModel.create({
        name,
        email,
        password: this.hashPassword(password)
      });

      await user.save();

      return UserMapper.userEntityFromObject(user)

    } catch (error) {
      if (error instanceof CustomError) {
        throw error;
      }

      throw CustomError.internalServerError()
    }

  }

}