import connectDb from "../config/db.js"; // or wherever your db.js is
import Feedback from "../models/feedbackModel.js";

export default async function handler(req, res) {
  await connectDb(); // connect to MongoDB

  if (req.method === "POST") {
    const { name, message } = req.body;

    if (!name || !message) {
      return res.status(400).json({ success: false, message: "Name and message are required" });
    }

    try {
      const feedback = new Feedback({ name, message });
      await feedback.save();
      res.status(201).json({ success: true, message: "Feedback saved successfully!" });
    } catch (error) {
      console.error(error);
      res.status(500).json({ success: false, message: "Server error" });
    }
  } else {
    res.status(405).json({ success: false, message: "Method not allowed" });
  }
}
