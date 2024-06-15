import { Prisma, PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();
async function main() {
  const res = await prisma.$queryRaw(
    Prisma.sql`SELECT t.* FROM public."Hero" t order by random() limit 2`,
  );
  // const heroes = [
  //   { name: 'Hell' },
  //   { name: 'Sphinx' },
  //   { name: 'Darklord' },
  //   { name: 'Valkyrie' },
  //   { name: 'Poseidon' },
  //   { name: 'Phoenix' },
  //   { name: 'Chiron' },
  //   { name: 'Hera' },
  //   { name: 'Fenrir' },
  //   { name: 'Amon' },
  //   { name: 'Nezha' },
  // ];
  // const res = await prisma.hero.createMany({
  //   data: heroes,
  // });
  console.log(res[0]);
}
main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
