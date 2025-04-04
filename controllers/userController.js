const User = require("../models/User"); // ✅ Ensure this is at the top


exports.updateProfile = async (req, res) => {
    try {
      console.log("🔹 Update Profile API Hit!"); // Debug Log
      console.log("🔹 Request Body:", req.body); // Debug Log
      console.log("🔹 User ID from Token:", req.user); // Debug Log
  
      const { name, skills, resume } = req.body;
      const userId = req.user.id;
  
      const updatedUser = await User.findByIdAndUpdate(
        userId,
        { name, skills, resume },
        { new: true, runValidators: true }
      );
  
      if (!updatedUser) {
        return res.status(404).json({ message: "User not found" });
      }
  
      res.json({ message: "Profile updated successfully!", user: updatedUser });
    } catch (err) {
      console.error("❌ Server Error:", err.message); // Debug Log
      res.status(500).json({ message: "Server Error", error: err.message });
    }
  };
  