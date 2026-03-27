const express = require("express");
const Expense = require("../models/Expense");
const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

// get all expenses
router.get("/", authMiddleware, async (req, res) => {
  try {
    const expenses = await Expense.find({ userId: req.user.id }).sort({ createdAt: -1 });
    res.json(expenses);
  } catch (error) {
    console.log("Get expenses error:", error);
    res.status(500).json({ message: "Failed to fetch expenses" });
  }
});

// add expense
router.post("/", authMiddleware, async (req, res) => {
  try {
    const { title, price, quantity, category, date } = req.body;

    if (!title || !price || !quantity || !category || !date) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const total = Number(price) * Number(quantity);

    const expense = await Expense.create({
      title,
      price,
      quantity,
      total,
      category,
      date,
      userId: req.user.id
    });

    res.status(201).json(expense);
  } catch (error) {
    console.log("Add expense error:", error);
    res.status(500).json({ message: "Failed to add expense" });
  }
});

// delete expense
router.delete("/:id", authMiddleware, async (req, res) => {
  try {
    const expense = await Expense.findOneAndDelete({
      _id: req.params.id,
      userId: req.user.id
    });

    if (!expense) {
      return res.status(404).json({ message: "Expense not found" });
    }

    res.json({ message: "Expense deleted successfully" });
  } catch (error) {
    console.log("Delete expense error:", error);
    res.status(500).json({ message: "Failed to delete expense" });
  }
});

module.exports = router;