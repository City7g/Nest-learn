import {
  Controller,
  Get,
  Post,
  Param,
  NotFoundException,
  ParseIntPipe,
  Delete,
  Put,
  Body,
  HttpCode,
} from '@nestjs/common'
import { UsersService } from './users.service'
import { UpdateUsersDto } from './dto/update.dto'
import { CreateUsersDto } from './dto/create.dto'
import { ApiResponse, ApiTags } from '@nestjs/swagger'
import { UserEntity, UserListResponse } from './entity/user.entity'

@Controller('users')
@ApiTags('Users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Get()
  @ApiResponse({
    status: 200,
    description: 'Return all users',
    type: [UserEntity],
  })
  async findAll(): Promise<UserListResponse> {
    try {
      const users = await this.usersService.findUsers()
      return {
        users,
        count: users.length,
      }
    } catch (error) {
      const errorWithMessage = error as Error
      throw new NotFoundException(errorWithMessage.message)
    }
  }

  @Get('/:id')
  @ApiResponse({
    status: 200,
    description: 'Return one user',
    type: UserEntity,
  })
  async findOne(@Param('id', ParseIntPipe) id: number) {
    try {
      return await this.usersService.findUserById(id)
    } catch (error) {
      const errorWithMessage = error as Error
      throw new NotFoundException(errorWithMessage.message)
    }
  }

  @Post()
  @ApiResponse({
    status: 200,
    description: 'Return created user',
    type: UserEntity,
  })
  async create(@Body() dto: CreateUsersDto) {
    try {
      return await this.usersService.createUser(dto)
    } catch (error) {
      const errorWithMessage = error as Error
      throw new NotFoundException(errorWithMessage.message)
    }
  }

  @Put('/:id')
  @ApiResponse({
    status: 200,
    description: 'Return updated user',
    type: UserEntity,
  })
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: UpdateUsersDto,
  ) {
    try {
      return await this.usersService.updateUser(id, dto)
    } catch (error) {
      const errorWithMessage = error as Error
      throw new NotFoundException(errorWithMessage.message)
    }
  }

  @HttpCode(204)
  @Delete('/:id')
  async delete(@Param('id', ParseIntPipe) id: number) {
    try {
      await this.usersService.deleteUser(id)
    } catch (error) {
      const errorWithMessage = error as Error
      throw new NotFoundException(errorWithMessage.message)
    }
  }
}
