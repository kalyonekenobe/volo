const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

module.exports = {
  async up() {
    const data = [{ name: 'admin' }, { name: 'user' }];

    await prisma.userRole.createMany({ data });
  },

  async down() {
    await prisma.userRole.deleteMany();
  },
};
