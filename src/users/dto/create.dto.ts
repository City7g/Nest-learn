import { ApiProperty } from '@nestjs/swagger'
import { IsEmail, IsString } from 'class-validator'
import { faker } from '@faker-js/faker'

export class CreateUsersDto {
  @ApiProperty({ description: 'name', example: faker.person.fullName() })
  @IsString()
  name: string

  @ApiProperty({ description: 'email', example: faker.internet.email() })
  @IsEmail()
  email: string

  @ApiProperty({ description: 'password', example: faker.internet.password() })
  @IsString()
  password: string
}
