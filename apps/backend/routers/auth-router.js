import { Router } from "express";
import { ValidatorMiddleware } from "../middleware/validator-middleware.js";
import { SignUpSchema, LogInSchema } from "../schemas/index.js";
import { AuthController } from "../controllers/auth-controller.js";
export const authRouter = Router();

authRouter.get(
  "/login",
  ValidatorMiddleware.validateSchema(LogInSchema, "body"),
  (req, res) => {
    AuthController.login(req, res);
  }
);

authRouter.get(
  "/signup",
  ValidatorMiddleware.validateSchema(SignUpSchema, "body"),
  (req, res) => {
    AuthController.signup(req, res);
  }
);

authRouter.get("/refresh", (req, res) => {
  try {
    AuthController.verify(req, res);
  } catch (e) {
    res.send("Unauthorized");
  }
});

authRouter.get("/verify", (req, res) => {
  try {
    AuthController.verify(req, res);
  } catch (e) {
    res.send("Unauthorized");
  }
});
