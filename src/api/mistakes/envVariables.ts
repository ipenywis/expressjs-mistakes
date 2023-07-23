import express, { NextFunction, Request, Response } from "express";

import MessageResponse from "../../interfaces/MessageResponse";

const importDynamic = new Function("modulePath", "return import(modulePath)");
const router = express.Router();

let chatgptBad;

//Bad ❌
//Hardcoding top secret passwords and API Token is bad, always!
(async () => {
  const { ChatGPTUnofficialProxyAPI } = await importDynamic("chatgpt");

  chatgptBad = new ChatGPTUnofficialProxyAPI({
    accessToken: "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",
  });
})();

router.get<{}, MessageResponse>("/bad", async (req, res) => {
  const response = await chatgptBad.sendMessage("Hey there!");

  console.log("Response: ", response);

  res.json({
    message: "ChatGPT Responded!",
    data: response,
  });
});

//Good ✅
//Use environment variable :D
(async () => {
  const { ChatGPTUnofficialProxyAPI } = await importDynamic("chatgpt");

  chatgptBad = new ChatGPTUnofficialProxyAPI({
    accessToken: process.env.CHATGPT_API_TOKEN,
  });
})();

console.log("Env Variable:", process.env.CUSTOM_VARIABLE);

router.post<{}, MessageResponse>("/good", (req, res) => {
  const body = req.body;
  console.log("Creating New user for: ", body.username, body.email);

  res.json({
    message: "Thanks for Registering!",
  });
});

export default router;
