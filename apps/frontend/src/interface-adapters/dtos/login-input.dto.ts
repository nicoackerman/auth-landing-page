import type z from "zod";
import type { LogInSchema } from "../schemas/login.schema";

export type LoginInput = z.infer<typeof LogInSchema>;