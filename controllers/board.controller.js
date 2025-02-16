const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const boardPostsModel = require("../models/board.model");

/* 게시글 목록 조회 */
async function sendAllPosts(req, res) {
  try {
    const postData = await boardPostsModel.getAllPosts();
    console.log(postData);

    res.render("pages/board", { postData });
  } catch (e) {
    console.error("Error....!:", e);
  }
}

/* 게시글 내용 조회 */
async function sendOnePost(req, res) {
  const postId = req.params.id;
  const postContent = await boardPostsModel.getOnePost(postId);
  console.log(postContent);

  res.render("pages/post", { postContent });
}

/* 글작성 페이지 호출 */
function getCreate(req, res) {
  res.render("pages/write");
}

/* 게시글 작성 */
async function writePost(req, res) {
  const { subject, content, authorId } = req.body;

  try {
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
  sendAllPosts,
  sendOnePost,
  writePost,
  getCreate,
};
