const { errorHandler } = require("../helpers/error_handler");
const NewsWithLangs = require("../Schema/NewsWithLangs");
const { newsWithLangsValidation } = require("../Validations/newsWithLangs.validation");
const mongoose = require("mongoose");

const addNewNewsWithLangs = async (req, res) => {
  try {
    const { title, content, sumary_news, lang_id } = req.body;
    const newNewsWithLangs = await pool.query(
      `
            INSERT INTO newsWithLangss(title, content, sumary_news, lang_id)
            VALUES ($1, $2, $3, $4) RETURNING *
            `,
      [title, content, sumary_news, lang_id]
    );

    res
      .status(201)
      .send({ message: "Yangi til qoshildi", lang: newNewsWithLangs.rows[0] });
  } catch (error) {
    errorHandler(error, res);
  }
};

const getAllNewsWithLangss = async (req, res) => {
  try {
    const allNewsWithLangss = await NewsWithLangs.find({});

    res.status(201).send({ message: "Hama tilar", allNewsWithLangss });
  } catch (error) {
    errorHandler(error, res);
  }
};

const getNewsWithLangsById = async (req, res) => {
  try {
    const id = req.params.id;
    if (!mongoose.isValidObjectId(id)) {
      return res.status(400).send({ error: "Incorrect ObjectID" });
    }
    const newsWithLangs = await NewsWithLangs.findById(id);
    res.send({ newsWithLangs });
  } catch (error) {
    errorHandler(error, res);
  }
};

const updateNewsWithLangsById = async (req, res) => {
  try {
    const id = req.params.id;
    const { error, value } = newsWithLangsValidation(req.body);

    if (error) {
      return errorHandler(error, res);
    }

    const { newsWithLangs } = value;
    if (!mongoose.isValidObjectId(id)) {
      return res.status(400).send({ error: "Incorrect ObjectID" });
    }

    res.send({ newsWithLangs });
  } catch (error) {
    errorHandler(error, res);
  }
};

const deleteNewsWithLangsById = async (req, res) => {
  try {
    const id = req.params.id;
    if (!mongoose.isValidObjectId(id)) {
      return res.status(400).send({ error: "Incorrect bjectID" });
    }

    const newsWithLangs = await NewsWithLangs.findByIdAndDelete({ _id: id });

    res.send({ newsWithLangs });
  } catch (error) {
    console.log(error);
    res.status(500).send({ error: "Server xatolik" });
  }
};

module.exports = {
  addNewNewsWithLangs,
  getAllNewsWithLangss,
  getNewsWithLangsById,
  updateNewsWithLangsById,
  deleteNewsWithLangsById,
};
