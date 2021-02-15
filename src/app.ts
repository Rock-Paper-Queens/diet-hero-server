import express from "express";
import router from "./api/coin";
import { json } from "body-parser";

const app = express();

app.use("/api", router);

export { app };
