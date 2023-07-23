import express from "express";

import MessageResponse from "../../interfaces/MessageResponse";
import emojis from "../emojis";
import errorHandling from "../mistakes/errorHandling";
import validation from "../mistakes/validation";
import envVariables from "../mistakes/envVariables";

const router = express.Router();

router.get<{}, MessageResponse>("/", (req, res) => {
  res.json({
    message: "API V2!",
  });
});

router.use("/emojis", emojis);
router.use("/error-handling", errorHandling);
router.use("/validation", validation);
router.use("/env-variables", envVariables);

export default router;
