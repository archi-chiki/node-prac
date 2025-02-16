const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

/* 게시글 목록 데이터 */
async function getAllPosts() {
  try {
    const postData = await prisma.post.findMany({
      select: {
        id: true,
        subject: true,
        createdAt: true,
        author: {
          select: {
            name: true,
          },
        },
      },
    });

    return postData;
  } catch (error) {
    console.error("Error fetching posts:", error);
  } finally {
    await prisma.$disconnect();
  }
}

/* 단일 게시글 내용 조회 */
async function getOnePost(postId) {
  try {
    const postData = await prisma.post.findMany({
      where: {
        id: parseInt(postId),
      },
      select: {
        id: true,
        subject: true,
        createdAt: true,
        content: true,
        author: {
          select: {
            name: true,
          },
        },
      },
    });
    return postData;
  } catch (error) {
    console.error("Error fetching posts:", error);
  } finally {
    await prisma.$disconnect();
  }
}

module.exports = {
  getAllPosts,
  getOnePost,
};
