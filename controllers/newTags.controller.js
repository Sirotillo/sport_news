const { errorHandler } = require("../helpers/error_handler");
const NewTag = require("../Schema/NewTags");
const { newTagValidation } = require("../Validations/newTags.validation");
const mongoose = require("mongoose");

const addNewNewTag = async (req, res) => {
  try {
    const { news_id, tag_id } = req.body;
    const newNewTag = await pool.query(
      `
            INSERT INTO newTags(news_id, tag_id)
            VALUES ($1, $2) RETURNING *
            `,
      [news_id, tag_id]
    );

    res
      .status(201)
      .send({ message: "Yangi til qoshildi", lang: newNewTag.rows[0] });
  } catch (error) {
    errorHandler(error, res);
  }
};

const getAllNewTags = async (req, res) => {
  try {
    const allNewTags = await NewTag.find({});

    res.status(201).send({ message: "Hama tilar", allNewTags });
  } catch (error) {
    errorHandler(error, res);
  }
};

const getNewTagById = async (req, res) => {
  try {
    const id = req.params.id;
    if (!mongoose.isValidObjectId(id)) {
      return res.status(400).send({ error: "Incorrect ObjectID" });
    }
    const newTag = await NewTag.findById(id);
    res.send({ newTag });
  } catch (error) {
    errorHandler(error, res);
  }
};

const updateNewTagById = async (req, res) => {
  try {
    const id = req.params.id;
    const { error, value } = newTagValidation(req.body);

    if (error) {
      return errorHandler(error, res);
    }

    const { newTag } = value;
    if (!mongoose.isValidObjectId(id)) {
      return res.status(400).send({ error: "Incorrect ObjectID" });
    }

    res.send({ newTag });
  } catch (error) {
    errorHandler(error, res);
  }
};

const deleteNewTagById = async (req, res) => {
  try {
    const id = req.params.id;
    if (!mongoose.isValidObjectId(id)) {
      return res.status(400).send({ error: "Incorrect bjectID" });
    }

    const newTag = await NewTag.findByIdAndDelete({ _id: id });

    res.send({ newTag });
  } catch (error) {
    console.log(error);
    res.status(500).send({ error: "Server xatolik" });
  }
};

module.exports = {
  addNewNewTag,
  getAllNewTags,
  getNewTagById,
  updateNewTagById,
  deleteNewTagById,
};
