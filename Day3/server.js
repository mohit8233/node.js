const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

mongoose.connect("mongodb+srv://Mohit01:mohit123@cluster0.dgizdrt.mongodb.net/mohit22")
  .then(() => console.log("mongoose connected"))
  .catch((err) => console.log("mongoose error", err));

const userSchema = new mongoose.Schema({
  name: String,
  role: String
});

const User = mongoose.model("User", userSchema);

// add user
app.post("/add-user", async (req, res) => {
  try {
    const { name, role } = req.body;

    const newUser = new User({ name, role });
    await newUser.save();

    res.json({ message: "user saved successfully", newUser });
  } catch (error) {
    console.log("Add error:", error);
    res.status(500).json({ message: "Error saving user" });
  }
});

// get all users
app.get("/users", async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (error) {
    console.log("Get error:", error);
    res.status(500).json({ message: "Error fetching users" });
  }
});

app.listen(3000, () => {
  console.log("Server running on http://localhost:3000");
});