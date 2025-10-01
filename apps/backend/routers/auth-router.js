import { Router } from "express";
import { ValidatorMiddleware } from "../middleware/validator-middleware.js";
import { SignUpSchema, LogInSchema } from "../schemas/index.js";
import { AuthController } from "../controllers/auth-controller.js";
export const authRouter = Router();

authRouter.get(
  "/login",
  ValidatorMiddleware.validateSchema(LogInSchema, "body"),
  (req, res, next) => {
    AuthController.login(req, res, next);
  }
);

authRouter.get(
  "/signup",
  ValidatorMiddleware.validateSchema(SignUpSchema, "body"),
  (req, res, next) => {
    AuthController.signup(req, res, next);
  }
);

authRouter.get("/refresh", (req, res, next) => {
  try {
    AuthController.verify(req, res, next);
  } catch (e) {
    res.send("Unauthorized");
  }
});

authRouter.get("/verify", (req, res, next) => {
  try {
    AuthController.verify(req, res, next);
  } catch (e) {
    res.send("Unauthorized");
  }
});
