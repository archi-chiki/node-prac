const express = require("express");
const boardController = require("../controllers/board.controller");
const boardRouter = express.Router();

// 전체 게시글 조회
boardRouter.get("/", boardController.sendAllPosts);
// 글쓰기 호출
boardRouter.get("/write", boardController.getCreate);
// 특정 게시글 조회
boardRouter.get("/:id", boardController.sendOnePost);
// 게시글 데이터 전송
boardRouter.post("/write", boardController.writePost);

module.exports = boardRouter;
