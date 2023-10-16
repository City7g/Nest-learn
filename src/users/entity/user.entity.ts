import { ApiProperty } from '@nestjs/swagger'
import { faker } from '@faker-js/faker'
import { User } from '@prisma/client'

export class UserEntity {
  @ApiProperty({ description: 'name', example: faker.number.int(100) })
  id: number

  @ApiProperty({ description: 'name', example: faker.person.fullName() })
  name: string

  @ApiProperty({ description: 'email', example: faker.internet.email() })
  email: string

  @ApiProperty({ description: 'createdAt', example: faker.date.past() })
  createdAt: Date

  @ApiProperty({ description: 'updatedAt', example: faker.date.past() })
  updatedAt: Date
}

export interface UserListResponse {
  users: User[]
  count: number
}
