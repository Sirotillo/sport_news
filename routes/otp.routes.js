const { createOtp, verifyOtp } = require("../controllers/otp.controller");

const router = require("express").Router();

router.post("/createotp", createOtp)
router.post("/verifyOtp", verifyOtp)

module.exports = router