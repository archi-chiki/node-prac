const { PrismaClient } = require("@prisma/client");
const res = require("express/lib/response");
const prisma = new PrismaClient();

async function writePost(req, res) {
  const { subject, content, authorId } = req.body;

  try {
    // Prisma를 사용하여 Post 테이블에 데이터 삽입
    const newPost = await prisma.post.create({
      data: {
        subject,
        authorId: parseInt(authorId),
        content,
      },
    });
    console.log(newPost);
    res.redirect("/board");
  } catch (error) {
    console.error("Error creating post:", error);
    res.status(500).json({ error: "Failed to create post" });
  }
}

module.exports = {
  writePost,
};
