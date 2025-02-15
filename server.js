const express = require("express");
const app = express();
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const PORT = process.env.PORT || 3000;
const usersListRouter = require("./routes/users.list.router");
const usersDeleteRouter = require("./routes/users.delete.router");
const usersCreateRouter = require("./routes/users.create.route");
const res = require("express/lib/response");

// Body parser
app.use(express.json());

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

const posts = [
  {
    id: "1",
    title: "첫 번째 게시글",
    author: "초보개발자",
    date: "2025-02-14",
    views: "120",
    likes: "10",
  },
  {
    id: "2",
    title: "두 번째 게시글",
    author: "코딩고수",
    date: "2025-02-13",
    views: "99",
    likes: "8",
  },
];

// 게시판
app.get("/board", (req, res) => {
  res.render("pages/board", { posts });
});

app.get("/board/write", (req, res) => {
  res.render("pages/write");
});

// 데이터베이스 연결 확인 및 서버 시작
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

startServer();
