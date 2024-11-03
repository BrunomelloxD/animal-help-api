import { PrismaClient } from '@prisma/client';
import { city } from './data/city';
const prisma = new PrismaClient();

interface City {
  sigla: string;
  nome: string;
  cidades?: string[];
}

export async function seedCity() {
  const cities = city.estados as City[];

  for (const city of cities) {
    const uf = await prisma.uf.findUnique({
      where: { uf: city.sigla },
    });

    if (uf) continue;

    if (city.cidades) {
      for (const cidadeNome of city.cidades) {
        const cidadeExistente = await prisma.city.findFirst({
          where: { name: cidadeNome, uf_id: uf.id },
        });

        if (!cidadeExistente) {
          await prisma.city.create({
            data: {
              name: cidadeNome,
              uf_id: uf.id,
            },
          });
        }
      }
    } else {
      console.log(`UF ${city.sigla} não encontrada.`);
    }
  }
}

seedCity()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
