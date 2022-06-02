const express = require("express");
const router = express.Router();
const questionController = require("../controllers/question.controller");


router.post("/create",questionController.create_question);
router.delete("/delete/:id",questionController.delete_question)








module.exports= router;