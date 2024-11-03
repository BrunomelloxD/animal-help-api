import { seedUf } from './ufs/uf.seed';
import { seedCity } from './cities/city.seed';

async function main() {
  await seedUf();
  await seedCity();
}
