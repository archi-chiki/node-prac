const express = require("express");
const app = express();
const path = require("path");
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const PORT = process.env.PORT || 3000;
const usersListRouter = require("./src/routes/users.list.router");
const usersDeleteRouter = require("./src/routes/users.delete.router");
const usersCreateRouter = require("./src/routes/users.create.router");
const boardRouter = require("./src/routes/board.router");

// Body parser
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// View Engine
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "src/views"));
app.use(express.static("public"));

// 메인 페이지
app.get("/", (req, res) => {
  res.render("pages/index");
});

// 사용자 관련 기능
app.use("/users", usersCreateRouter);
app.use("/users", usersListRouter);
app.use("/users", usersDeleteRouter);

// 게시판 관련 기능
app.use("/board", boardRouter);

// app.get("/board", async (req, res) => {
//   const postData = await imsi.fetchPosts();

//   res.render("pages/board", { postData });
// });

// const docs = [
//   {
//     subject: "안녕하세요 1",
//     author: "츠키",
//     content:
//       "prisma에서 DB테이블 객체에 접근하기 위해선 위에서 생성한 prisma객체에 이전에 생성한 Schema에서 만든 모델명을 이용해 prisma ORM을 사용할 수 있다.",
//   },
//   {
//     subject: "안녕하세요 2",
//     author: "츠키",
//     content:
//       "prisma에서 DB테이블 객체에 접근하기 위해선 위에서 생성한 prisma객체에 이전에 생성한 Schema에서 만든 모델명을 이용해 prisma ORM을 사용할 수 있다.",
//   },
//   {
//     subject: "안녕하세요 3",
//     author: "츠키",
//     content:
//       "prisma에서 DB테이블 객체에 접근하기 위해선 위에서 생성한 prisma객체에 이전에 생성한 Schema에서 만든 모델명을 이용해 prisma ORM을 사용할 수 있다.",
//   },
//   {
//     subject: "안녕하세요 4",
//     author: "츠키",
//     content:
//       "prisma에서 DB테이블 객체에 접근하기 위해선 위에서 생성한 prisma객체에 이전에 생성한 Schema에서 만든 모델명을 이용해 prisma ORM을 사용할 수 있다.",
//   },
// ];

// app.get("/board/:id", (req, res) => {
//   const posts = docs[req.params.id];
//   res.render("pages/board.content.ejs", { posts });
// });

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
