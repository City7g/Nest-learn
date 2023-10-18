import {
  Body,
  Controller,
  HttpCode,
  NotFoundException,
  Post,
  UseGuards,
} from '@nestjs/common'
import { ApiResponse, ApiTags } from '@nestjs/swagger'
import { SigninDto } from './dto/signin.dto'
import { AuthService } from './auth.service'
import { SignupDto } from './dto/signup.dto'
import { AuthGuard } from '@nestjs/passport'

@Controller('auth')
@ApiTags('Auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  // @UseGuards(AuthGuard('local'))
  // @Post('/signin')
  // @HttpCode(200)
  // @ApiResponse({
  //   status: 200,
  //   description: 'Return access and refresh token',
  //   // type: AuthResponse,
  // })
  // async signin(@Body() dto) {
  //   console.log('auth controller', dto)

  //   try {
  //     return await this.authService.signin(dto)
  //   } catch (error) {
  //     const errorWithMessage = error as Error
  //     throw new NotFoundException(errorWithMessage.message)
  //   }
  // }

  @Post('/signin')
  @HttpCode(200)
  @ApiResponse({
    status: 200,
    description: 'Return access and refresh token',
  })
  async signin(@Body() dto: SigninDto) {
    try {
      return await this.authService.signin(dto)
    } catch (error) {
      const errorWithMessage = error as Error
      throw new NotFoundException(errorWithMessage.message)
    }
  }

  // @Post('/signup')
  // @HttpCode(201)
  // @ApiResponse({
  //   status: 201,
  //   description: 'Signup and return tokens',
  //   // type: ResponseAuthDto,
  // })
  // async signup(@Body() dto: SignupDto) {
  //   try {
  //     const user = await this.authService.signup(dto)

  //     const payload = { email: user.email }

  //     return {
  //       user,
  //       access_token: await this.jwrService.signAsync(payload),
  //       refresh_token: await this.jwrService.signAsync(payload),
  //     }
  //   } catch (error) {
  //     const errorWithMessage = error as Error
  //     throw new NotFoundException(errorWithMessage.message)
  //   }
  // }
}
