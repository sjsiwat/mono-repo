import express from "express";
import { users } from "./fakeDB/users.js";

const app = express();
const port = 3000;

app.use(express.json());
//crud

//read
app.get("/users", (req, res) => {
  try {
    res.json(users);
  } catch (err) {
    next(err);
  }
});

// create
app.post("/users", (req, res) => {
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
app.put("/users/:id", (req, res) => {
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
app.delete("/users/:id", (req, res) => {
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

// Centralized Error handling middleware

app.use((err, req, res, next) => {
  return res
    .status(500)
    .json({ error: "Something crash bro", message: err.message });
});

app.listen(port, () => {
  console.log(`Server is running on PORT : ${port} ✔`);
});
