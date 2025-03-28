const {
  addNewUser,
  getAllUsers,
  getUserById,
  updateUserById,
  deleteUserById,
  loginUser,
  logoutUser,
  refreshAccessToken,
} = require("../controllers/users.controller");

const router = require("express").Router();

router.post("/", addNewUser);

router.get("/", getAllUsers);

router.get("/:id", getUserById);

router.put("/:id", updateUserById);

router.delete("/:id", deleteUserById);

router.post("/login", loginUser);
router.post("/logout", logoutUser);
router.post("/refresh", refreshAccessToken);

module.exports = router;