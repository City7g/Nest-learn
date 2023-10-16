import { ApiProperty } from '@nestjs/swagger'
import { IsEmail, IsOptional, IsString } from 'class-validator'
import { faker } from '@faker-js/faker'

export class UpdateUsersDto {
  @ApiProperty({ description: 'name', example: faker.person.fullName() })
  @IsOptional()
  @IsString()
  name?: string

  @ApiProperty({ description: 'name', example: faker.internet.email() })
  @IsOptional()
  @IsEmail()
  email?: string

  @ApiProperty({ description: 'name', example: faker.internet.password() })
  @IsOptional()
  @IsString()
  password?: string
}
