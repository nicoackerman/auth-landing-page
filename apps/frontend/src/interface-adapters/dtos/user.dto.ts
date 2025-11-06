import type z from "zod";
import type { UserSchema } from "../schemas/user.schema";

export type User = z.infer<typeof UserSchema>;