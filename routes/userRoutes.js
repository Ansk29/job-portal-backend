const express = require("express");
const { updateProfile } = require("../controllers/userController");
const authMiddleware = require("../middleware/authMiddleware"); // Ensure user is logged in
const router = express.Router();

router.put("/profile", authMiddleware, updateProfile); // Protected Route

module.exports = router;
