import { ApiProperty } from '@nestjs/swagger'
import { IsEmail, IsString } from 'class-validator'
import { faker } from '@faker-js/faker'

export class SignupDto {
  @ApiProperty({ description: 'name', example: faker.person.firstName() })
  @IsString()
  name: string

  @ApiProperty({ description: 'email', example: faker.internet.email() })
  @IsEmail()
  email: string

  @ApiProperty({ description: 'password', example: faker.internet.password() })
  @IsString()
  password: string
}
