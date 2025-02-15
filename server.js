const express = require("express");
const app = express();
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const PORT = process.env.PORT || 3000;
const usersListRouter = require("./routes/users.list.router");
const usersDeleteRouter = require("./routes/users.delete.router");
const usersCreateRouter = require("./routes/users.create.router");
const boardWriteRouter = require("./routes/board.write.router");
const boardListRouter = require("./routes/board.list.router");

// Body parser
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// View Engine
app.set("view engine", "ejs");
app.use(express.static("public"));

// 메인 페이지
app.get("/", (req, res) => {
  res.render("pages/index");
});

// 사용자 생성, 조회, 삭제
app.use("/users", usersListRouter);
app.use("/users", usersDeleteRouter);
app.use("/users", usersCreateRouter);

// 게시판 조회, 글작성
// app.get("/board", async (req, res) => {
//   const postData = await imsi.fetchPosts();

//   res.render("pages/board", { postData });
// });
app.use("/board", boardListRouter);
app.use("/board/write", boardWriteRouter);

app.get("/board/write", (req, res) => {
  res.render("pages/write");
});

async function startServer() {
  try {
    await prisma.$connect();
    console.log("Database connected successfully!");

    // 서버 시작
    app.listen(PORT, () => {
      console.log(`Server is running on http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error("Failed to connect to the database:", error.message);
    process.exit(1);
  }
}

// 데이터베이스 연결 확인 및 서버 시작
startServer();
