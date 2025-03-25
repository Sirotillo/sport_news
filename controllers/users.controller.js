const { errorHandler } = require("../helpers/error_handler");
const User = require("../Schema/Users");
const { userValidation } = require("../Validations/user.validation");
const mongoose = require("mongoose");

const addNewUser = async (req, res) => {
  try {
    const { first_name, last_name, email, password, role, is_active, created_at, interests, bookmarks } = req.body;
    const newUser = await pool.query(
      `
            INSERT INTO users(first_name, last_name, email, password, role, is_active, created_at, interests, bookmarks)
            VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9) RETURNING *
            `,
      [first_name, last_name, email, password, role, is_active, created_at, interests, bookmarks]
    );

    res
      .status(201)
      .send({ message: "Yangi til qoshildi", lang: newUser.rows[0] });
  } catch (error) {
    errorHandler(error, res);
  }
};

const getAllUsers = async (req, res) => {
  try {
    const allUsers = await User.find({});

    res.status(201).send({ message: "Hama tilar", allUsers });
  } catch (error) {
    errorHandler(error, res);
  }
};

const getUserById = async (req, res) => {
  try {
    const id = req.params.id;
    if (!mongoose.isValidObjectId(id)) {
      return res.status(400).send({ error: "Incorrect ObjectID" });
    }
    const user = await User.findById(id);
    res.send({ user });
  } catch (error) {
    errorHandler(error, res);
  }
};

const updateUserById = async (req, res) => {
  try {
    const id = req.params.id;
    const { error, value } = userValidation(req.body);

    if (error) {
      return errorHandler(error, res);
    }

    const { user } = value;
    if (!mongoose.isValidObjectId(id)) {
      return res.status(400).send({ error: "Incorrect ObjectID" });
    }

    res.send({ user });
  } catch (error) {
    errorHandler(error, res);
  }
};

const deleteUserById = async (req, res) => {
  try {
    const id = req.params.id;
    if (!mongoose.isValidObjectId(id)) {
      return res.status(400).send({ error: "Incorrect bjectID" });
    }

    const user = await User.findByIdAndDelete({ _id: id });

    res.send({ user });
  } catch (error) {
    console.log(error);
    res.status(500).send({ error: "Server xatolik" });
  }
};

module.exports = {
  addNewUser,
  getAllUsers,
  getUserById,
  updateUserById,
  deleteUserById,
};
