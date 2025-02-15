const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

async function main() {
  // 새로운 사용자 생성
  const newUser = await prisma.user.create({
    data: {
      name: "John Doe",
      email: "john.doe@example.com",
    },
  });
  console.log("Created User:", newUser);

  // 모든 사용자 조회
  const users = await prisma.user.findMany();
  console.log("All Users:", users);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
