import { INestApplication } from '@nestjs/common'
import { Test, TestingModule } from '@nestjs/testing'
import * as request from 'supertest'
import { AppModule } from './../src/app.module'
import { faker } from '@faker-js/faker'

describe('UserModule (e2e)', () => {
  let app: INestApplication

  it('Get all users', async () => {
    const response = await request(app.getHttpServer()).get('/users')
    expect(response.status).toBe(200)
  })

  it('Get one users for id', async () => {
    const response = await request(app.getHttpServer()).get('/users')
    expect(response.body.count).toBeGreaterThan(0)
  })

  it('Get one users for id', async () => {
    const response = await request(app.getHttpServer()).get('/users/1000000')
    expect(response.status).toBe(404)
  })

  // it('Create new user', async () => {
  //   const newUser = {
  //     name: faker.person.fullName(),
  //     email: faker.internet.email(),
  //     password: faker.internet.password(),
  //   }
  //   const response = await request(app.getHttpServer())
  //     .post('/users')
  //     .send(newUser)

  //   expect(response.status).toEqual(201)
  //   expect(newUser).toEqual({ ...newUser })
  // })

  it('Create new user test validation', async () => {
    const newUser = {
      name: '',
      email: '',
      password: '',
    }
    const response = await request(app.getHttpServer())
      .post('/users')
      .send(newUser)
    // .send(newUser)

    console.log(response.text)

    expect(response.status).toEqual(404)
    expect(response.text).toEqual(404)
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
