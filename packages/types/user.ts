import { z } from "zod"
import { SessionSchema } from "../schemas/user"

type User = z.infer<typeof SessionSchema>;
