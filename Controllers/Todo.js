const pool = require("../Utils/DB");

exports.addTodo = async (req, res) => {
  const { description } = req.body;
  try {
    const newTodo = await pool.query(
      "INSERT INTO todo (user_id, description) VALUES ($1, $2) RETURNING *",
      [req.user.user_id, description]
    );
    return res.status(200).json({ msg: "Todo Added", todo: newTodo.rows[0] });
  } catch (error) {
    console.log(error.message);
    res.status(400).json("Something Went Wrong");
  }
};

exports.getTodo = async (req, res) => {
  try {
    const todos = await pool.query("SELECT * FROM todo");
    return res
      .status(200)
      .json({ length: todos.rows.length, todos: todos.rows });
  } catch (error) {
    console.log(error.message);
    res.status(400).json("Something Went Wrong");
  }
};

// f5127b6d-cc9e-473c-98f0-be85a265edd7
// 18f56d1a-cc04-40a7-8409-026e3cd879d3

exports.getTodoById = async (req, res) => {
  const { id } = req.params;
  const foundTodo = await pool.query("SELECT * FROM todo WHERE todo_id = $1", [
    id,
  ]);
  return res.status(200).json({ message: "Found Todo", todo: foundTodo.rows });
};

exports.updateTodo = async (req, res) => {
  const { id } = req.params;
  const { description } = req.body;
  try {
    const updatedTodo = await pool.query(
      "UPDATE todo SET description = $1 WHERE todo_id = $2 RETURNING *",
      [description, id]
    );
    return res
      .status(200)
      .json({ message: "Updated Todo", todo: updatedTodo.rows });
  } catch (error) {
    console.log(error.message);
    res.status(400).json("Something Went Wrong");
  }
};

exports.deleteTodo = async (req, res) => {
  const { id } = req.params;

  try {
    await pool.query("DELETE FROM todo WHERE todo_id = $1", [id]);
    return res.json(200).json({ msg: "Deleted Record" });
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server error");
  }
};
