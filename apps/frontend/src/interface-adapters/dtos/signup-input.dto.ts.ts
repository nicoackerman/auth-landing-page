import type z from "zod";
import type { SignUpSchema } from "../schemas/signup.schema";

export type SignUpInput = z.infer<typeof SignUpSchema>;
