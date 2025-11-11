import express from "express";
import sendFeedback from "../controllers/feedbackController.js";

const router = express.Router();

// POST route for feedback submission
router.post("/feedback", sendFeedback);

export default router;