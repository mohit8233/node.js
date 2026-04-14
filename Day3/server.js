const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

mongoose
  .connect("mongodb+srv://Mohit01:mohit123@cluster0.dgizdrt.mongodb.net/mohit22")
  .then(() => console.log("mongoose connected"))
  .catch((err) => console.log("mongoose error", err));

const userSchema = new mongoose.Schema({
  name: String,
  role: String,
});

const User = mongoose.model("User", userSchema);

app.post("/add-user", async (req, res) => {
  try {
    const newUser = new User(req.body);
    await newUser.save();
    res.json(newUser);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error.message });
  }
});

app.get("/users", async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error.message });
  }
});

app.get("/user/:id", async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    res.json(user);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error.message });
  }
});

app.put("/update-user/:id", async (req, res) => {
  try {
    console.log("params id:", req.params.id);
    console.log("body:", req.body);

    const updatedUser = await User.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    if (!updatedUser) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json({ message: "User updated successfully", updatedUser });
  } catch (error) {
    console.log("update error:", error);
    res.status(500).json({ error: error.message });
  }
});

app.delete("/delete-user/:id", async (req, res) => {
  try {
    const { id } = req.params;
    console.log("Delete request for id:", id);

    const deletedUser = await User.findByIdAndDelete(id);

    if (!deletedUser) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({
      message: "User deleted successfully",
      deletedUser,
    });
  } catch (error) {
    console.log("Delete error:", error);
    res.status(500).json({
      message: "Server error while deleting user",
      error: error.message,
    });
  }
});

app.listen(3000, () => {
  console.log("Server running on http://localhost:3000");
});