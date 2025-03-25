const {
  addNewUser,
  getAllUsers,
  getUserById,
  updateUserById,
  deleteUserById,
} = require("../controllers/users.controller");

const router = require("express").Router();

router.post("/", addNewUser);

router.get("/", getAllUsers);

router.get("/:id", getUserById);

router.put("/:id", updateUserById);

router.delete("/:id", deleteUserById);

module.exports = router;
