const { errorHandler } = require("../helpers/error_handler");
const Category = require("../Schema/Category");
const { categoryValidation } = require("../Validations/category.validation");
const mongoose = require("mongoose");

const addNewCategory = async (req, res) => {
  try {
    const { category_name, description, parent_id } = req.body;
    const newCategory = await pool.query(
      `
            INSERT INTO categorys(category_name, description, parent_id)
            VALUES ($1, $2, $3) RETURNING *
            `,
      [category_name, description, parent_id]
    );

    res
      .status(201)
      .send({ message: "Yangi til qoshildi", lang: newCategory.rows[0] });
  } catch (error) {
    errorHandler(error, res);
  }
};

const getAllCategorys = async (req, res) => {
  try {
    const allCategorys = await Category.find({});

    res.status(201).send({ message: "Hama tilar", allCategorys });
  } catch (error) {
    errorHandler(error, res);
  }
};

const getCategoryById = async (req, res) => {
  try {
    const id = req.params.id;
    if (!mongoose.isValidObjectId(id)) {
      return res.status(400).send({ error: "Incorrect ObjectID" });
    }
    const category = await Category.findById(id);
    res.send({ category });
  } catch (error) {
    errorHandler(error, res);
  }
};

const updateCategoryById = async (req, res) => {
  try {
    const id = req.params.id;
    const { error, value } = categoryValidation(req.body);

    if (error) {
      return errorHandler(error, res);
    }

    const { category } = value;
    if (!mongoose.isValidObjectId(id)) {
      return res.status(400).send({ error: "Incorrect ObjectID" });
    }

    res.send({ category });
  } catch (error) {
    errorHandler(error, res);
  }
};

const deleteCategoryById = async (req, res) => {
  try {
    const id = req.params.id;
    if (!mongoose.isValidObjectId(id)) {
      return res.status(400).send({ error: "Incorrect bjectID" });
    }

    const category = await Category.findByIdAndDelete({ _id: id });

    res.send({ category });
  } catch (error) {
    console.log(error);
    res.status(500).send({ error: "Server xatolik" });
  }
};

module.exports = {
  addNewCategory,
  getAllCategorys,
  getCategoryById,
  updateCategoryById,
  deleteCategoryById,
};
