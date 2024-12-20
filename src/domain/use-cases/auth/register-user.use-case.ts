import { JwtAdapter } from "../../../config";
import { RegisterUserDto } from "../..";
import { CustomError } from "../../errors/custom.error";
import { AuthRepository } from "../../repositories/auth.repository";

interface UserToken {
  token: string;
  user: {
    id: string;
    name: string;
    email: string;
  }
}

interface RegisterUser {
  execute(registerUserDto: RegisterUserDto): Promise<UserToken>
}

type SignTokenCallback = (payload: Object, duration?: string) => Promise<string | null>


export class RegisterUserUseCase implements RegisterUser {

  constructor(
    private readonly authRepository: AuthRepository,
    private readonly signToken: SignTokenCallback = JwtAdapter.generateToken
  ) { }

  async execute(registerUserDto: RegisterUserDto): Promise<UserToken> {

    // Crear Usuario
    const user = await this.authRepository.register(registerUserDto)

    // Token
    const token = await this.signToken({ id: user.id }, '2h');
    if (!token) throw CustomError.internalServerError('Error generating token');

    return {
      token,
      user: {
        id: user.id,
        name: user.name,
        email: user.email
      }
    }
  }
}