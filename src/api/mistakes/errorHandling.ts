import express, { NextFunction, Request, Response } from "express";

import MessageResponse from "../../interfaces/MessageResponse";

const router = express.Router();

//Bad ❌
//This will use the default express error handler!
router.get<{}, MessageResponse>("/bad", (req, res) => {
  throw new Error("Something went sideways!");

  res.json({
    message: "Hello there - 👋🌎🌍🌏",
  });
});

//Good ✅
//Define your own Error handler(s) - in app.ts
router.get<{}, MessageResponse>("/good", (req, res) => {
  //Make sure to set a custom statusCode for the thrown Error!
  res.statusCode = 400;
  throw new Error(
    "Something went sideways! but its being handled by our custom error handler"
  );

  res.json({
    message: "Hello there - 👋🌎🌍🌏",
  });
});

export default router;
