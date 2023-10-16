import { ApiProperty } from '@nestjs/swagger'
import { faker } from '@faker-js/faker'

export class AuthEntity {
  constructor() {}

  // @ApiProperty({ description: 'Access token', example: jw.sign(fakeUser, secretKey, { expiresIn: '1h' }))
  // access_token: string

  @ApiProperty({ description: 'name', example: faker.person.fullName() })
  name: string

  @ApiProperty({ description: 'email', example: faker.internet.email() })
  email: string
}

// export interface AuthResponse {
//   // users: UserEntity
//   access_token: string
//   refresh_token: string
// }
