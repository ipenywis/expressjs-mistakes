import express from "express";
import morgan from "morgan";
import helmet from "helmet";
import cors from "cors";

require("dotenv").config();

import * as middlewares from "./middlewares";
import api from "./api";
import apiV2 from "./api/v2";

const app = express();

app.use(express.json());

//Good ✅
//Use Third-party trusted middlewares
//For Security, Logging and more!
app.use(morgan("dev"));
app.use(helmet());
app.use(cors());

//-------------------------------------

//Good ✅
//Using API Versioning
app.use("/api/v1", api);

app.use("/api/v2", apiV2);

//Bad ❌
//Not using API Versioning
app.use("/api", api);

app.use(middlewares.notFound);

//-------------------------------------

//Good ✅
//Define error handler last
app.use(middlewares.errorHandler);

export default app;
