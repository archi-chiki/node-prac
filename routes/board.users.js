const express = require("express");
const postsController = require("");
const postsRouter = express.Router();

postsRouter.get("/", postsController.);

module.exports = postsRouter;
