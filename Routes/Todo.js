const express = require("express");
const {
  addTodo,
  getTodo,
  getTodoById,
  updateTodo,
  deleteTodo,
} = require("../Controllers/Todo");
const { requireSignIn } = require("../Middlewares");
const router = express.Router();

router.post("/todo/post", requireSignIn, addTodo);
router.get("/todo/todos", requireSignIn, getTodo);
router.get("/todo/t/:id", requireSignIn, getTodoById);
router.put("/todo/u/:id", requireSignIn, updateTodo);
router.delete("/todo/d/:id", requireSignIn, deleteTodo);

module.exports = router;
