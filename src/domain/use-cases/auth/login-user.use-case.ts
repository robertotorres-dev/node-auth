import { JwtAdapter } from "../../../config";
import { LoginUserDto } from "../..";
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

interface LoginUser {
  execute(loginUserDto: LoginUserDto): Promise<UserToken>
}

type SignTokenCallback = (payload: Object, duration?: string) => Promise<string | null>


export class LoginUserUseCase implements LoginUser {

  constructor(
    private readonly authRepository: AuthRepository,
    private readonly signToken: SignTokenCallback = JwtAdapter.generateToken
  ) { }

  async execute(loginUserDto: LoginUserDto): Promise<UserToken> {

    // Find Usuario
    const user = await this.authRepository.login(loginUserDto);

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