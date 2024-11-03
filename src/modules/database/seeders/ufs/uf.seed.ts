import { PrismaClient } from '@prisma/client';
import { uf } from './data/uf';
const prisma = new PrismaClient();

export async function seedUf() {
  for (const item of uf.UF) {
    const exists = await prisma.uf.findFirst({
      where: {
        uf: item.uf,
      },
    });

    if (exists) continue;

    await prisma.uf.create({
      data: {
        name: item.name,
        uf: item.uf,
      },
    });
  }
}
seedUf()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
