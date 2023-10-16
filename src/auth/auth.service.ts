import { Injectable } from '@nestjs/common'
import { Prisma, PrismaClient } from '@prisma/client'
import { SigninDto } from './dto/signin.dto'
import { SignupDto } from './dto/signup.dto'

@Injectable()
export class AuthService {
  constructor(private prisma: PrismaClient) {}

  async signin({ email, password }: SigninDto) {
    try {
      return await this.prisma.user.findUniqueOrThrow({
        where: {
          email,
          password,
        },
        select: {
          id: true,
          name: true,
          email: true,
        },
      })
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        if (error.code === 'P2025')
          throw new Error("User with this id don't exists.")
      }
      throw new Error('Server error')
    }
  }

  async signup(dto: SignupDto) {
    try {
      return await this.prisma.user.create({
        data: dto,
      })
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        if (error.code === 'P2002')
          throw new Error('User with this email already exists.')
      }
      throw new Error('Server error')
    }
  }
}
