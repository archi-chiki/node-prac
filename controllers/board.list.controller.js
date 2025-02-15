const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

async function fetchPosts(req, res) {
  try {
    postData = [];

    // 데이터베이스에서 Post 테이블의 모든 데이터를 조회 후 데이터 전달
    postData = await prisma.post.findMany();
    res.render("pages/board", { postData });
  } catch (error) {
    console.error("Error fetching posts:", error);
  } finally {
    await prisma.$disconnect();
  }
}

module.exports = {
  fetchPosts,
};
