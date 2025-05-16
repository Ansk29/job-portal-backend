const express = require("express");
const { deleteJob, getAllUsers, deleteUser, updateUserRole } = require("../controllers/adminController");
const authMiddleware = require("../middleware/authMiddleware");
const roleMiddleware = require("../middleware/roleMiddleware");

const router = express.Router();

//  Delete any job (Admin only)
router.delete("/jobs/:id", authMiddleware, roleMiddleware(["admin"]), deleteJob);

//  Get all users (Admin only)
router.get("/users", authMiddleware, roleMiddleware(["admin"]), getAllUsers);

//  Delete any user (Admin only)
router.delete("/users/:id", authMiddleware, roleMiddleware(["admin"]), deleteUser);

//  Update User Role (Admin only)
router.put("/users/:id", authMiddleware, roleMiddleware(["admin"]), updateUserRole);

module.exports = router;
