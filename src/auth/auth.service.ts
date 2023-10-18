import { Injectable } from '@nestjs/common'
import { Prisma } from '@prisma/client'
import { SigninDto } from './dto/signin.dto'
import { SignupDto } from './dto/signup.dto'
import { UsersService } from 'src/users/users.service'
import { JwtService } from '@nestjs/jwt'

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  // async validateUser(email: string, pass: string) {
  //   console.log('auth service', email, pass)
  //   try {
  //     const user = await this.usersService.findUserByEmail(email)

  //     if (user && user.password === pass) {
  //       const { password, ...result } = user
  //       return result
  //     }

  //     throw new Error("User with this login and password don't exists.")
  //   } catch (error) {
  //     if (error instanceof Prisma.PrismaClientKnownRequestError) {
  //       if (error.code === 'P2025')
  //         throw new Error("User with this login and password don't exists.")
  //     }
  //     throw new Error('Server error')
  //   }
  // }

  async signin({ email, password: pass }: SigninDto) {
    // const payload = { username: user.username, sub: user.userId }
    // return {
    //   access_token: this.jwtService.sign(payload),
    // }
    try {
      const user = await this.usersService.findUserByEmail(email)
      if (user && user.password === pass) {
        const { password, ...result } = user
        return {
          user: result,
          access_token: await this.jwtService.signAsync({
            id: result.id,
            name: result.name,
            email: result.email,
          }),
        }
      }
      throw new Error("User with this login and password don't exists.")
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        if (error.code === 'P2025')
          throw new Error("User with this login and password don't exists.")
      }
      throw new Error('Server error')
    }
  }

  // async signup(dto: SignupDto) {
  //   try {
  //     return await this.prisma.user.create({
  //       data: dto,
  //     })
  //   } catch (error) {
  //     if (error instanceof Prisma.PrismaClientKnownRequestError) {
  //       if (error.code === 'P2002')
  //         throw new Error('User with this email already exists.')
  //     }
  //     throw new Error('Server error')
  //   }
  // }
}
