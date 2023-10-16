import { INestApplication } from '@nestjs/common'
import { Test, TestingModule } from '@nestjs/testing'
import * as request from 'supertest'
import { AppModule } from './../src/app.module'
import { faker } from '@faker-js/faker'
import jwt from 'jsonwebtoken'

describe('UserModule (e2e)', () => {
  let app: INestApplication
  let access_token: string = ''
  const testUser = {
    login: 'City7gor@gmail.com',
    password: '123',
  }

  it('Success login', async () => {
    const response = await request(app.getHttpServer())
      .post('/auth/login')
      .send(testUser)

    access_token = response.body.access_token

    expect(response.status).toBe(200)
    expect(response.body.access_token).toMatch(
      /^.{30,40}\..{50,120}\..{30,50}$/,
    )
    expect(response.body.user).toEqual(testUser)

    console.log(testUser)
  })

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile()

    app = moduleFixture.createNestApplication()

    await app.init()
  })

  afterAll(async () => {
    await app.close()
  })
})
