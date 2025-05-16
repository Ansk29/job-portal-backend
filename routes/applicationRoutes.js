const express = require("express");
const { applyJob, getJobApplications, getAllApplications, updateApplicationStatus, deleteApplication,getCandidateApplications } = require("../controllers/applicationController");
const authMiddleware = require("../middleware/authMiddleware");
const roleMiddleware = require("../middleware/roleMiddleware");

const router = express.Router();

router.post("/", authMiddleware, roleMiddleware(["candidate"]), applyJob);
router.get("/job/:jobId", authMiddleware, roleMiddleware(["employer"]), getJobApplications);
router.get("/", authMiddleware, roleMiddleware(["admin"]), getAllApplications);
router.get("/candidate", authMiddleware, roleMiddleware(["candidate"]), getCandidateApplications);

router.put("/:appId", authMiddleware, roleMiddleware(["employer"]), updateApplicationStatus);
router.delete("/:appId", authMiddleware, roleMiddleware(["admin"]), deleteApplication);

module.exports = router;
