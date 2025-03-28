const { errorHandler } = require("../helpers/error_handler");
const User = require("../Schema/Users");
const { userValidation } = require("../Validations/user.validation");
const DeviceDetector = require("node-device-detector");
const DeviceHelper = require('node-device-detector/helper');
const detector = new DeviceDetector({
  clientIndexes: true,
  deviceIndexes: true,
  deviceAliasCode: false,
  deviceTrusted: false,
  deviceInfo: false,
  maxUserAgentSize: 500,
});
const mongoose = require("mongoose");
const pool = require("../config/db");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const config = require("config");

const addNewUser = async (req, res) => {
  try {
    const {
      first_name,
      last_name,
      email,
      password,
      role,
      is_active,
      created_at,
      interests,
      phone_number,
    } = req.body;
    const newUser = await pool.query(
      `
            INSERT INTO users(first_name, last_name, email, password, role, is_active, created_at, interests, phone_number)
            VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9) RETURNING *
            `,
      [
        first_name,
        last_name,
        email,
        password,
        role,
        is_active,
        created_at,
        interests,
        phone_number,
      ]
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
    const userAgent = req.headers["user-agent"];
    // console.log(userAgent);

    const result = detector.detect(userAgent);
    console.log("result parse", result);

    console.log(DeviceHelper.isDesktop(result));
    

    const allUsers = await pool.query("SELECT * FROM users");

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

const generateTokens = (user) => {
  const accessToken = jwt.sign(
    { id: user.id, email: user.email, role: user.role },
    config.get("jwt_secret"),
    { expiresIn: "15m" }
  );
  const refreshToken = jwt.sign(
    { id: user.id },
    config.get("jwt_refresh_secret"),
    { expiresIn: "7d" }
  );
  return { accessToken, refreshToken };
};

const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const userQuery = await pool.query("SELECT * FROM users WHERE email = $1", [
      email,
    ]);
    const user = userQuery.rows[0];

    if (!user) {
      return res.status(400).send({ error: "Email yoki parol noto'g'ri" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).send({ error: "Email yoki parol noto'g'ri" });
    }

    const tokens = generateTokens(user);
    res.send(tokens);
  } catch (error) {
    errorHandler(error, res);
  }
};

const logoutUser = async (req, res) => {
  try {
    res.send({ message: "Foydalanuvchi tizimdan chiqdi" });
  } catch (error) {
    errorHandler(error, res);
  }
};

const refreshAccessToken = async (req, res) => {
  try {
    const { refreshToken } = req.body;
    if (!refreshToken) {
      return res.status(401).send({ error: "Refresh token talab qilinadi" });
    }

    jwt.verify(
      refreshToken,
      config.get("jwt_refresh_secret"),
      (err, decoded) => {
        if (err) {
          return res
            .status(403)
            .send({ error: "Noto'g'ri yoki eskirgan token" });
        }
        const newAccessToken = jwt.sign(
          { id: decoded.id },
          config.get("jwt_secret"),
          { expiresIn: "15m" }
        );
        res.send({ accessToken: newAccessToken });
      }
    );
  } catch (error) {
    errorHandler(error, res);
  }
};

module.exports = {
  addNewUser,
  getAllUsers,
  getUserById,
  updateUserById,
  deleteUserById,
  loginUser,
  logoutUser,
  refreshAccessToken,
};
