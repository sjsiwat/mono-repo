import { json, Router } from "express";
import { users } from "../../fakeDB/users.js";
import { User } from "../../models/user.model.js";

export const router = Router();

//read , get all user
router.get("/", async (req, res, next) => {
  try {
    const users = await User.find();
    return res.json(users);
  } catch (err) {
    next(err);
  }
});

// create
router.post("/", async (req, res, next) => {
  try {
    const { username, email, password } = req.body;

    if (!username || !email || !password) {
      return res
        .status(400)
        .json({ error: "username , email , password are required" });
    }

    const newUser = await User.create({ username, email, password });
    const { password: _password, ...userWithoutPassword } =
      newUser.toObject(JSON);
    return res.status(201).json(userWithoutPassword);
  } catch (err) {
    next(err);
  }
});

// update
router.put("/:id", async (req, res, next) => {
  try {
    const { id } = req.params;
    const { username, email, password } = req.body;

    const updatedUser = await User.findByIdAndUpdate(
      id,
      { username, email, password },
      { new: true, runValidators: true },
    );

    if (!updatedUser) {
      return res.status(404).json({ error: "User not found" });
    }

    const { password: _password, ...userWithoutPassword } =
      updatedUser.toObject();
    return res.status(200).json(userWithoutPassword);
  } catch (err) {
    next(err);
  }
});

// delete
router.delete("/:id", async (req, res, next) => {
  try {
    const { id } = req.params;

    const deletedUser = await User.findByIdAndDelete(id);

    if (!deletedUser) {
      return res.status(404).json({ error: "User not found" });
    }

    return res.status(200).json({ message: "Yo ! User deleted successfully" });
  } catch (err) {
    next(err);
  }
});
