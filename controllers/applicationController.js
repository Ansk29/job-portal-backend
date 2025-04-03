const Application = require("../models/Application");
const Job = require("../models/Job");

// Apply for a Job (Candidate)
exports.applyJob = async (req, res) => {
  try {
    const { jobId, resume } = req.body;

    const job = await Job.findById(jobId);
    if (!job) return res.status(404).json({ message: "Job Not Found" });

    const newApplication = new Application({
      job: jobId,
      candidate: req.user.id,
      resume,
    });

    await newApplication.save();
    res.status(201).json({ message: "Job Application Submitted!", application: newApplication });
  } catch (err) {
    res.status(500).json({ message: "Server Error", error: err.message });
  }
};

// Get Applications for a Job (Employer)
exports.getJobApplications = async (req, res) => {
  try {
    const job = await Job.findById(req.params.jobId);
    if (!job) return res.status(404).json({ message: "Job Not Found" });

    if (job.postedBy.toString() !== req.user.id) {
      return res.status(403).json({ message: "Not Authorized" });
    }

    const applications = await Application.find({ job: req.params.jobId }).populate("candidate", "name email");
    res.json(applications);
  } catch (err) {
    res.status(500).json({ message: "Server Error", error: err.message });
  }
};

// Get All Applications (Admin)
exports.getAllApplications = async (req, res) => {
  try {
    const applications = await Application.find().populate("job", "title").populate("candidate", "name email");
    res.json(applications);
  } catch (err) {
    res.status(500).json({ message: "Server Error", error: err.message });
  }
};

// Update Application Status (Employer)
exports.updateApplicationStatus = async (req, res) => {
  try {
    const { status } = req.body;
    const application = await Application.findById(req.params.appId);

    if (!application) return res.status(404).json({ message: "Application Not Found" });

    const job = await Job.findById(application.job);
    if (job.postedBy.toString() !== req.user.id) {
      return res.status(403).json({ message: "Not Authorized" });
    }

    application.status = status;
    await application.save();
    res.json({ message: "Application Status Updated!", application });
  } catch (err) {
    res.status(500).json({ message: "Server Error", error: err.message });
  }
};

// Delete an Application (Admin)
exports.deleteApplication = async (req, res) => {
  try {
    await Application.findByIdAndDelete(req.params.appId);
    res.json({ message: "Application Deleted Successfully!" });
  } catch (err) {
    res.status(500).json({ message: "Server Error", error: err.message });
  }
};
