import { Router } from "express";
import { supabase } from "../../config/supabase.js";

export const router = Router();

const PG_SELECT = "id, username, email, role, created_at, updated_at";

// 1. Read
router.get("/", async (req, res, next) => {
  try {
    const { data, error } = await supabase.from("users").select(PG_SELECT);
    if (error) throw error;
    return res.status(200).json({ success: true, data });
  } catch (err) {
    next(err);
  }
});

// 2. Create
router.post("/", async (req, res, next) => {
  try {
    const { username, email, password, role } = req.body;

    if (!username || !email || !password) {
      return res
        .status(400)
        .json({ error: "username, email, password are required" });
    }

    const { data, error } = await supabase
      .from("users")
      .insert([{ username, email, password, role }])
      .select(PG_SELECT)
      .single();

    if (error) throw error;
    return res.status(201).json({ success: true, data });
  } catch (err) {
    next(err);
  }
});

// 3. Update
router.put("/:id", async (req, res, next) => {
  try {
    const { id } = req.params;
    const { username, email, password, role } = req.body;

    const { data, error } = await supabase
      .from("users")
      .update({
        username,
        email,
        password,
        role,
        updated_at: new Date().toISOString(),
      })
      .eq("id", id)
      .select(PG_SELECT)
      .single();

    if (error) throw error;
    return res.status(200).json({ success: true, data });
  } catch (err) {
    next(err);
  }
});

// 4. Delete
router.delete("/:id", async (req, res, next) => {
  try {
    const { id } = req.params;

    const { data, error } = await supabase
      .from("users")
      .delete()
      .eq("id", id)
      .select(PG_SELECT)
      .single();

    if (error) throw error;
    return res
      .status(200)
      .json({ success: true, message: "User deleted successfully" });
  } catch (err) {
    next(err);
  }
});
