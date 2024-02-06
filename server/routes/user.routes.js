const Router = require("express");
const {
  loginUser,
  registerUser,
  logoutUser,
  getUser,
  updateUser,
} = require("../controllers/user.controller");
const verifyToken = require("../middlewares/verifyToken");

const router = Router();

router.post("/login", loginUser);
router.post("/register", registerUser);
router.get("/logout", logoutUser);
router.get("/get", getUser);
router.post("/update", updateUser);

module.exports = router;
