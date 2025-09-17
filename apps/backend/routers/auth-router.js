import { Router } from "express";
import { AuthController } from "../controllers/index.js";

export const authRouter = Router();
authRouter.get("/", (res, req) => {
  res.send("");
});
