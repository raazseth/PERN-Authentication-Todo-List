const pool = require("../Utils/DB");
const bcrypt = require("bcrypt");
const JWT = require("jsonwebtoken");

exports.Register = async (req, res) => {
  const { email, name, password } = req.body;

  try {
    const user = await pool.query("SELECT * FROM users WHERE user_email = $1", [
      email,
    ]);

    if (user.rows.length > 0) {
      return res.status(400).json("User already exist!");
    }

    const salt = await bcrypt.genSalt(10);
    const bcryptPassword = await bcrypt.hash(password, salt);

    const newUser = await pool.query(
      "INSERT INTO users (user_name, user_email, user_password) VALUES ($1, $2, $3) RETURNING *",
      [name, email, bcryptPassword]
    );

    const token = JWT.sign(
      { user_id: newUser.rows[0].user_id },
      process.env.JWT_SECRET
    );

    return res.json({ token, user: newUser.rows[0] });
  } catch (error) {
    console.error(error);
    res.status(500).send("Server error");
  }
};

exports.Login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const foundUser = await pool.query(
      "SELECT * FROM users WHERE user_email = $1",
      [email]
    );

    if (foundUser.rows.length > 0) {
      const validPassword = await bcrypt.compare(
        password,
        foundUser.rows[0].user_password
      );

      if (!validPassword) {
        return res.status(401).json("Invalid Credential");
      }

      const token = JWT.sign(
        { user_id: foundUser.rows[0].user_id },
        process.env.JWT_SECRET
      );

      return res.json({ token, user: foundUser.rows[0] });
    } else {
      return res.status(400).json({ error: "User not found!" });
    }
  } catch (error) {
    console.log(error.message);
    res.status(400).json("Something Went Wrong");
  }
};

exports.UpdateUser = async (req, res) => {
  const { email, name, password } = req.body;

  try {
    const user = await pool.query("SELECT * FROM users WHERE user_email = $1", [
      email,
    ]);

    if (user.rows.length > 0) {
      const salt = await bcrypt.genSalt(10);
      const bcryptPassword = await bcrypt.hash(password, salt);

      const updatedUser = await pool.query(
        "UPDATE users SET user_name = $1, user_email = $2, user_password = $3 WHERE user_email = $2 RETURNING *",
        [name, email, bcryptPassword]
      );

      return res.json({ user: updatedUser.rows[0] });
    }
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
};

exports.DeleteUser = async (req, res) => {
  const { email } = req.body;

  try {
    await pool.query("DELETE FROM users WHERE user_email = $1", [email]);

    return res.json(200).json({ msg: "Deleted Record" });
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server error");
  }
};
