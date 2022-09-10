const express = require("express");
const {
  Register,
  Login,
  UpdateUser,
  DeleteUser,
} = require("../Controllers/Auth");
const { requireSignIn } = require("../Middlewares");
const router = express.Router();

router.post("/register", Register);
router.post("/login", Login);
router.put("/update", requireSignIn, UpdateUser);
router.delete("/delete", DeleteUser);

module.exports = router;
