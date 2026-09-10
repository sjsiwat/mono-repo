import mongoose from "mongoose";
import bcrypt from "bcrypt";

const userSchema = new mongoose.Schema(
  {
    username: { type: String },
    role: { type: String, enum: ["user", "admin"], default: "user" },
    email: {
      type: String,
      unique: true,
      lowerCase: true,
      trim: true,
      match: [/^[^\s@]+@[^\s@]+\.[^\s@]+$/, "Invalid email format"],
    },
    password: { type: String, select: false },
    passwordHash: { type: String, select: false },
  },
  { timestamps: true },
);

//  hash password before saving to database

// userSchema.pre("save", async function () {
//   if (!this.isModified("password")) return;

//   this.password = await bcrypt.hash(this.password, 12);
// });

export const User = mongoose.model("User", userSchema);
