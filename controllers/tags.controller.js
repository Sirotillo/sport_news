const { errorHandler } = require("../helpers/error_handler");
const Tag = require("../Schema/Tags");
const { tagValidation } = require("../Validations/tags.validation");
const mongoose = require("mongoose");

const addNewTag = async (req, res) => {
  try {
    const { tag_name, description } = req.body;
    const newTag = await pool.query(
      `
            INSERT INTO tags(tag_name, description)
            VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9) RETURNING *
            `,
      [tag_name, description]
    );

    res
      .status(201)
      .send({ message: "Yangi til qoshildi", lang: newTag.rows[0] });
  } catch (error) {
    errorHandler(error, res);
  }
};

const getAllTags = async (req, res) => {
  try {
    const allTags = await Tag.find({});

    res.status(201).send({ message: "Hama tilar", allTags });
  } catch (error) {
    errorHandler(error, res);
  }
};

const getTagById = async (req, res) => {
  try {
    const id = req.params.id;
    if (!mongoose.isValidObjectId(id)) {
      return res.status(400).send({ error: "Incorrect ObjectID" });
    }
    const tag = await Tag.findById(id);
    res.send({ tag });
  } catch (error) {
    errorHandler(error, res);
  }
};

const updateTagById = async (req, res) => {
  try {
    const id = req.params.id;
    const { error, value } = tagValidation(req.body);

    if (error) {
      return errorHandler(error, res);
    }

    const { tag } = value;
    if (!mongoose.isValidObjectId(id)) {
      return res.status(400).send({ error: "Incorrect ObjectID" });
    }

    res.send({ tag });
  } catch (error) {
    errorHandler(error, res);
  }
};

const deleteTagById = async (req, res) => {
  try {
    const id = req.params.id;
    if (!mongoose.isValidObjectId(id)) {
      return res.status(400).send({ error: "Incorrect bjectID" });
    }

    const tag = await Tag.findByIdAndDelete({ _id: id });

    res.send({ tag });
  } catch (error) {
    console.log(error);
    res.status(500).send({ error: "Server xatolik" });
  }
};

module.exports = {
  addNewTag,
  getAllTags,
  getTagById,
  updateTagById,
  deleteTagById,
};
