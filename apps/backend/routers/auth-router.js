import { Router } from "express";
import { Guard } from "../middleware/guard.js";
import { SignUpSchema, LogInSchema } from "../../../packages/schemas/user.js";
import { AuthController } from "../controllers/auth-controller.js";
export const authRouter = Router();

authRouter.get(
  "/login",
  Guard.validateSchema(LogInSchema, "body"),
  (req, res, next) => {
    AuthController.login(req, res, next);
  }
);

authRouter.get(
  "/signup",
  Guard.validateSchema(SignUpSchema, "body"),
  (req, res, next) => {
    AuthController.signup(req, res, next);
  }
);

authRouter.get("/refresh", Guard.validateRefreshToken(), (req, res, next) => {
  AuthController.refresh(req, res, next);
});

authRouter.get("/me", Guard.validateAccessToken(), (req, res, next) => {
  AuthController.refresh(req, res, next);
});
