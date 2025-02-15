const express = require("express");
const fetchController = require("../controllers/board.list.controller");
const boardListRouter = express.Router();

boardListRouter.get("/", fetchController.fetchPosts);

module.exports = boardListRouter;
