// api/feedback.js
import mongoose from "mongoose";
import Feedback from "../models/feedbackModel.js"; // adjust relative path

// reuse existing connection if present (Vercel serverless friendly)
let cached = global.mongoose;
if (!cached) cached = global.mongoose = { conn: null, promise: null };

async function connectDb() {
  if (cached.conn) return cached.conn;
  if (!cached.promise) {
    cached.promise = mongoose.connect(process.env.MONGODB_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
  }
  cached.conn = await cached.promise;
  return cached.conn;
}

export default async function handler(req, res) {
  await connectDb();

  if (req.method === "POST") {
    const { name, message } = req.body;
    if (!name || !message)
      return res.status(400).json({ success: false, message: "All fields required" });

    try {
      const feedback = new Feedback({ name, message });
      await feedback.save();
      res.status(201).json({ success: true, message: "Feedback saved!" });
    } catch (err) {
      console.error(err);
      res.status(500).json({ success: false, message: "Server error" });
    }
  } else {
    res.status(405).json({ success: false, message: "Method not allowed" });
  }
}
