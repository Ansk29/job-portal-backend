const express = require("express");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const cors = require("cors");
const morgan = require("morgan");

// Configurations
dotenv.config();
const app = express();
app.use(express.json());
app.use(cors());
app.use(morgan("dev"));

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log("✅ MongoDB Connected"))
.catch((err) => console.error("❌ MongoDB Connection Error:", err));

// Default Route
app.get("/", (req, res) => {
  res.send("Welcome to the Job Portal API ✅");
});

const authRoutes = require("./routes/authRoutes");
app.use("/api/auth", authRoutes);


const userRoutes = require("./routes/userRoutes");
app.use("/api/user", userRoutes);

const jobRoutes = require("./routes/jobRoutes");
app.use("/api/jobs", jobRoutes);

const applicationRoutes = require("./routes/applicationRoutes");
app.use("/api/applications", applicationRoutes);



// Server Start
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
