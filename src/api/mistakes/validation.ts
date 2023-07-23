import express, { NextFunction, Request, Response } from "express";

import MessageResponse from "../../interfaces/MessageResponse";
import Joi from "joi";

const router = express.Router();

//Bad ❌
//Not using validation at all!
router.post<{}, MessageResponse>("/bad", (req, res) => {
  const body = req.body;

  if (!body.username) throw new Error("Username is required!");

  if (!body.email) throw new Error("Email is required!");

  console.log("Creating New user for: ", body.username, body.email);

  res.json({
    message: "Thanks for Registering!",
  });
});

const validateRequest = (schema) => {
  return (req, res, next) => {
    const result = schema.validate(req.body);
    if (result.error) {
      return res.status(400).json({
        error: result.error.details[0].message,
      });
    }
    if (!req.value) {
      req.value = {};
    }
    req.value["body"] = result.value;
    next();
  };
};

const schema = Joi.object({
  username: Joi.string().required(),
  email: Joi.string().email().required(),
});

//Good ✅
//Run validation middle passing it the desired schema before
//Every request
router.post<{}, MessageResponse>(
  "/good",
  validateRequest(schema),
  (req, res) => {
    const body = req.body;
    console.log("Creating New user for: ", body.username, body.email);

    res.json({
      message: "Thanks for Registering!",
    });
  }
);

export default router;
