const { errorHandler } = require("../helpers/error_handler");
const Author = require("../Schema/Author");
const { authorValidation } = require("../Validations/authors.validation");
const mongoose = require("mongoose");

const addNewAuthor = async (req, res) => {
  try {
    const { user_id, is_approved, is_editor } = req.body;
    const newAuthor = await pool.query(
      `
            INSERT INTO authors(user_id, is_approved, is_editor)
            VALUES ($1, $2, $3) RETURNING *
            `,
      [user_id, is_approved, is_editor]
    );

    res
      .status(201)
      .send({ message: "Yangi til qoshildi", lang: newAuthor.rows[0] });
  } catch (error) {
    errorHandler(error, res);
  }
};

const getAllAuthors = async (req, res) => {
  try {
    const allAuthors = await Author.find({});

    res.status(201).send({ message: "Hama tilar", allAuthors });
  } catch (error) {
    errorHandler(error, res);
  }
};

const getAuthorById = async (req, res) => {
  try {
    const id = req.params.id;
    if (!mongoose.isValidObjectId(id)) {
      return res.status(400).send({ error: "Incorrect ObjectID" });
    }
    const author = await Author.findById(id);
    res.send({ author });
  } catch (error) {
    errorHandler(error, res);
  }
};

const updateAuthorById = async (req, res) => {
  try {
    const id = req.params.id;
    const { error, value } = authorValidation(req.body);

    if (error) {
      return errorHandler(error, res);
    }

    const { author } = value;
    if (!mongoose.isValidObjectId(id)) {
      return res.status(400).send({ error: "Incorrect ObjectID" });
    }

    res.send({ author });
  } catch (error) {
    errorHandler(error, res);
  }
};

const deleteAuthorById = async (req, res) => {
  try {
    const id = req.params.id;
    if (!mongoose.isValidObjectId(id)) {
      return res.status(400).send({ error: "Incorrect bjectID" });
    }

    const author = await Author.findByIdAndDelete({ _id: id });

    res.send({ author });
  } catch (error) {
    console.log(error);
    res.status(500).send({ error: "Server xatolik" });
  }
};

module.exports = {
  addNewAuthor,
  getAllAuthors,
  getAuthorById,
  updateAuthorById,
  deleteAuthorById,
};
