import { faker } from '@faker-js/faker'
import { PrismaClient } from '@prisma/client'
import * as bcrypt from 'bcrypt'

const prisma = new PrismaClient()

const main = async () => {
  for (let i = 0; i < 20; i++) {
    const user = await prisma.user.create({
      data: {
        name: faker.person.fullName(),
        email: faker.internet.email(),
        password: bcrypt.hashSync(faker.internet.password(), 10),
      },
    })

    console.log(`${user.id}. ${user.name} - ${user.email}`)
  }
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async e => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })
