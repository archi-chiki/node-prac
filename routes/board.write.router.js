const express = require("express");
const writeController = require("../controllers/board.write.controller");
const writeRouter = express.Router();

writeRouter.post("/", writeController.writePost);

module.exports = writeRouter;
