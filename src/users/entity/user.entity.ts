import { ApiProperty } from '@nestjs/swagger'
import { faker } from '@faker-js/faker'
import { User } from '@prisma/client'
import * as bcrypt from 'bcrypt'

export class UserEntity {
  @ApiProperty({ description: 'name', example: faker.number.int(100) })
  id: number

  @ApiProperty({ description: 'name', example: faker.person.fullName() })
  name: string

  @ApiProperty({ description: 'email', example: faker.internet.email() })
  email: string

  @ApiProperty({
    description: 'password',
    example: bcrypt.hashSync(faker.internet.password(), 10),
  })
  password: string

  @ApiProperty({ description: 'createdAt', example: faker.date.past() })
  createdAt: Date

  @ApiProperty({ description: 'updatedAt', example: faker.date.past() })
  updatedAt: Date
}

export interface UserListResponse {
  users: User[]
  count: number
}
