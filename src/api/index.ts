import express from "express";

import MessageResponse from "../interfaces/MessageResponse";
import emojis from "./emojis";
import errorHandling from "./mistakes/errorHandling";

const router = express.Router();

router.get<{}, MessageResponse>("/", (req, res) => {
  res.json({
    message: "API - 👋🌎🌍🌏",
  });
});

router.use("/emojis", emojis);
router.use("/error-handling", errorHandling);

export default router;
