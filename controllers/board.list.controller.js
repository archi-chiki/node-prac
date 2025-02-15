const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

async function listContents(req, res) {
  const contents = await prisma.posts.findMany();
}

module.exports = {
  listContents,
};
