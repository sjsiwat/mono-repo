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
router.put("/:id", (req, res, next) => {
  try {
  } catch (err) {
    next(err);
  }
});

// delete
router.delete("/:id", (req, res, next) => {
  try {
  } catch (err) {
    next(err);
  }
});
