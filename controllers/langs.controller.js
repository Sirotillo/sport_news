const { errorHandler } = require("../helpers/error_handler");
const Language = require("../Schema/Langs");
const { languageValidation } = require("../Validations/language.validation");
const mongoose = require("mongoose");

const addNewLang = async (req, res) => {
  try {
    const { name, code } = req.body;
    const newLang = await pool.query(
      `
            INSERT INTO languages(name, code)
            VALUES ($1, $2) RETURNING *
            `,
      [name, code]
    );

    res
      .status(201)
      .send({ message: "Yangi til qoshildi", lang: newLang.rows[0] });
  } catch (error) {
    errorHandler(error, res);
  }
};

const getAllLanguages = async (req, res) => {
  try {
    const allLanguages = await Language.find({});

    res.status(201).send({ message: "Hama tilar", allLanguages });
  } catch (error) {
    errorHandler(error, res);
  }
};

const getLanguageById = async (req, res) => {
  try {
    const id = req.params.id;
    if (!mongoose.isValidObjectId(id)) {
      return res.status(400).send({ error: "Incorrect ObjectID" });
    }
    const language = await Language.findById(id);
    res.send({ language });
  } catch (error) {
    errorHandler(error, res);
  }
};

const updateLanguageById = async (req, res) => {
  try {
    const id = req.params.id;
    const { error, value } = languageValidation(req.body);

    if (error) {
      return errorHandler(error, res);
    }

    const { language } = value;
    if (!mongoose.isValidObjectId(id)) {
      return res.status(400).send({ error: "Incorrect ObjectID" });
    }

    res.send({ language });
  } catch (error) {
    errorHandler(error, res);
  }
};

const deleteLanguageById = async (req, res) => {
  try {
    const id = req.params.id;
    if (!mongoose.isValidObjectId(id)) {
      return res.status(400).send({ error: "Incorrect bjectID" });
    }

    const language = await Language.findByIdAndDelete({ _id: id });

    res.send({ language });
  } catch (error) {
    console.log(error);
    res.status(500).send({ error: "Server xatolik" });
  }
};

module.exports = {
  addNewLang,
  getAllLanguages,
  getLanguageById,
  updateLanguageById,
  deleteLanguageById,
};
