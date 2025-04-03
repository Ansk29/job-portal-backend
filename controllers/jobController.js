const Job = require("../models/Job");

// Create a Job (Only Employer)
exports.createJob = async (req, res) => {
  try {
    const { title, description, company, location, salary } = req.body;

    const newJob = new Job({
      title,
      description,
      company,
      location,
      salary,
      postedBy: req.user.id, // Employer's ID
    });

    await newJob.save();
    res.status(201).json({ message: "Job Posted Successfully!", job: newJob });
  } catch (err) {
    res.status(500).json({ message: "Server Error", error: err.message });
  }
};

// Get All Jobs
exports.getJobs = async (req, res) => {
  try {
    const jobs = await Job.find().populate("postedBy", "name email");
    res.json(jobs);
  } catch (err) {
    res.status(500).json({ message: "Server Error", error: err.message });
  }
};

// Get a Single Job
exports.getJobById = async (req, res) => {
  try {
    const job = await Job.findById(req.params.id).populate("postedBy", "name email");
    if (!job) return res.status(404).json({ message: "Job Not Found" });

    res.json(job);
  } catch (err) {
    res.status(500).json({ message: "Server Error", error: err.message });
  }
};

// Update a Job (Only Employer who posted it)
exports.updateJob = async (req, res) => {
  try {
    const job = await Job.findById(req.params.id);

    if (!job) return res.status(404).json({ message: "Job Not Found" });

    if (job.postedBy.toString() !== req.user.id) {
      return res.status(403).json({ message: "Not Authorized" });
    }

    const updatedJob = await Job.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json({ message: "Job Updated Successfully!", job: updatedJob });
  } catch (err) {
    res.status(500).json({ message: "Server Error", error: err.message });
  }
};

// Delete a Job (Only Admin)
exports.deleteJob = async (req, res) => {
  try {
    const job = await Job.findById(req.params.id);
    if (!job) return res.status(404).json({ message: "Job Not Found" });

    await Job.findByIdAndDelete(req.params.id);
    res.json({ message: "Job Deleted Successfully!" });
  } catch (err) {
    res.status(500).json({ message: "Server Error", error: err.message });
  }
};
