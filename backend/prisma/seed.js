import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

async function main() {
  const count = await prisma.usuario.count();
  if (count > 0) {
    console.log("Banco já populado.");
    return;
  }

  await prisma.usuario.createMany({
    data: [
      { nome: "Gerente", email: "gerente@cafe.com", senha: "123456" },
      { nome: "Barista", email: "barista@cafe.com", senha: "123456" },
    ],
  });

  await prisma.insumo.createMany({
    data: [
      { nome: "Café Arábica", categoria: "Grão", estoque_minimo: 5, estoque_atual: 12 },
      { nome: "Leite Integral", categoria: "Leite", estoque_minimo: 10, estoque_atual: 25 },
      { nome: "Xarope de Baunilha", categoria: "Xarope", estoque_minimo: 2, estoque_atual: 8 },
    ],
  });

  console.log("Banco populado com dados iniciais!");
}

main()
  .catch((e) => console.error(e))
  .finally(async () => await prisma.$disconnect());