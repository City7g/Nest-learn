import {
  Body,
  Controller,
  HttpCode,
  NotFoundException,
  Post,
} from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger'
import { SigninDto } from './dto/signin.dto'
import { AuthService } from './auth.service'
import { SignupDto } from './dto/signup.dto'

@Controller('auth')
@ApiTags('Auth')
export class AuthController {
  constructor(
    private jwrService: JwtService,
    private authService: AuthService,
  ) {}

  @Post('/signin')
  // @ApiOperation({ summary: 'Create cat' })
  @HttpCode(200)
  @ApiResponse({
    status: 200,
    description: 'Return access and refresh token',
    // type: AuthResponse,
  })
  async signin(@Body() dto: SigninDto) {
    try {
      const user = await this.authService.signin(dto)

      const payload = { email: user.email }

      return {
        user,
        access_token: await this.jwrService.signAsync(payload),
        refresh_token: await this.jwrService.signAsync(payload),
      }
    } catch (error) {
      const errorWithMessage = error as Error
      throw new NotFoundException(errorWithMessage.message)
    }
  }

  @Post('/signup')
  @HttpCode(201)
  @ApiResponse({
    status: 201,
    description: 'Signup and return tokens',
    // type: ResponseAuthDto,
  })
  async signup(@Body() dto: SignupDto) {
    try {
      const user = await this.authService.signup(dto)

      const payload = { email: user.email }

      return {
        user,
        access_token: await this.jwrService.signAsync(payload),
        refresh_token: await this.jwrService.signAsync(payload),
      }
    } catch (error) {
      const errorWithMessage = error as Error
      throw new NotFoundException(errorWithMessage.message)
    }
  }
}
