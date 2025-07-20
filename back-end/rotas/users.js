const express = require("express");
const router = express.Router();
const User = require("../models/User");

// GET all users
router.get("/", async (req, res) => {
  try {
    const users = await User.findAll(); // Sequelize
    res.status(200).json(users);
  } catch (error) {
    console.error("Erro no GET /api/users:", error);
    res
      .status(500)
      .json({ message: "Error fetching users", error: error.message });
  }
});

// GET user by ID
router.get("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const user = await User.findByPk(id); // Sequelize
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json(user);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error fetching user", error: error.message });
  }
});

// POST create user
router.post("/", async (req, res) => {
  const { nome, email, dataNascimento } = req.body;
  try {
    const newUser = await User.create({ nome, email, dataNascimento }); // Sequelize
    res.status(201).json(newUser);
  } catch (error) {
    console.error("Erro no POST /api/users:", error);
    res
      .status(500)
      .json({ message: "Error creating user", error: error.message });
  }
});

// PUT update user
router.put("/:id", async (req, res) => {
  const { id } = req.params;
  const { nome, email, dataNascimento } = req.body;
  try {
    const user = await User.findByPk(id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    await user.update({ nome, email, dataNascimento }); // Sequelize
    res.status(200).json(user);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error updating user", error: error.message });
  }
});

// DELETE user
router.delete("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const user = await User.findByPk(id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    await user.destroy(); // Sequelize
    res.status(200).json({ message: "User deleted successfully" });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error deleting user", error: error.message });
  }
});

module.exports = router;
