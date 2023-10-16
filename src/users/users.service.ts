import { Injectable } from '@nestjs/common'
import { Prisma, PrismaClient, User } from '@prisma/client'
import { UpdateUsersDto } from './dto/update.dto'
import { CreateUsersDto } from './dto/create.dto'

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaClient) {}

  async findUsers(): Promise<User[]> {
    try {
      return await this.prisma.user.findMany()
    } catch (error) {
      throw new Error('Server error')
    }
  }

  async findUserById(id: number) {
    try {
      return await this.prisma.user.findUniqueOrThrow({
        where: {
          id,
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

  async createUser(dto: CreateUsersDto): Promise<User> {
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

  async updateUser(id: number, dto: UpdateUsersDto): Promise<User> {
    try {
      return await this.prisma.user.update({
        where: { id },
        data: dto,
      })
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        if (error.code === 'P2025')
          throw new Error("User with this id don't exists.")
      }
      throw new Error('Server error')
    }
  }

  async deleteUser(id: number): Promise<User> {
    try {
      return await this.prisma.user.delete({
        where: {
          id,
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
}
