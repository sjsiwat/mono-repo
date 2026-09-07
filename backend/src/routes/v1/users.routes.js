import { Router } from "express";
import { users } from "../../fakeDB/users.js";

export const router = Router();

//read , get all user
router.get("/", (req, res) => {
  try {
    res.json(users);
  } catch (err) {
    next(err);
  }
});

// create
router.post("/", (req, res) => {
  try {
    const { username, email, password } = req.body;

    if (!username || !email || !password) {
      return res.status(400).json({
        error: "require information. please enter username , email , password",
      });
    }
    const highestId = users.reduce(
      (max, user) => Math.max(max, Number(user.id)),
      0,
    );

    const nextId = String(highestId + 1);

    const newUser = {
      id: nextId,
      username: username,
      password: password,
      email: email,
    };
    users.push(newUser);

    return res.status(201).json(newUser);
  } catch (err) {
    next(err);
  }
});

// update
router.put("/:id", (req, res) => {
  try {
    const user = users.find((u) => u.id === req.params.id);
    if (!user) {
      return res.status(404).json({ error: "user not found. o_O! " });
    }
    const { username, email, password } = req.body;
    if (!username || !email || !password) {
      return res.status(400).json({ error: "all field data are required!" });
    }
    user.username = username;
    user.email = email;
    user.password = password;

    return res.status(200).json(user);
  } catch (err) {
    next(err);
  }
});

// delete
router.delete("/:id", (req, res) => {
  try {
    const index = users.findIndex((u) => u.id === req.params.id);

    if (index === -1) {
      return res.status(404).json({ error: "user not found. o_O!" });
    }

    const [deleted] = users.splice(index, 1);

    return res.status(200).json({ message: "deleted", user: deleted });
  } catch (err) {
    next(err);
  }
});
