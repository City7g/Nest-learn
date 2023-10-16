import { ApiProperty } from '@nestjs/swagger'
import { faker } from '@faker-js/faker'

export class UserEntity {
  @ApiProperty({ description: 'id', example: faker.number.int(100) })
  id: number

  @ApiProperty({ description: 'name', example: faker.person.fullName() })
  name: string

  @ApiProperty({ description: 'email', example: faker.internet.email() })
  email: string
}

export interface AuthResponse {
  users: UserEntity
  access_token: string
  refresh_token: string
}
