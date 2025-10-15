"use server";

import type { LoginActionResponse } from "~/types/actionsResponses";
import { UserSchema } from "~/types/user";
import { tryCatchSync } from "~/utils/tryCatch";

const LogInSchema = UserSchema.pick({
  username: true,
  password: true,
});

export async function submitLogin(
  prevState: LoginActionResponse | null,
  formData: FormData,
): Promise<LoginActionResponse> {
  const { data: rawData, error } = tryCatchSync(() => {
    return {
      username: formData.get("username") as string,
      password: formData.get("password") as string,
    };
  });

  if (error) {
    return {
      success: false,
      message: "An unexpected error occurred",
    };
  }

  const validatedData = LogInSchema.safeParse(rawData);

  if (!validatedData.success) {
    return {
      success: false,
      message: "Please fix the errors in the form",
      errors: validatedData.error.flatten().fieldErrors,
    };
  }

  console.log("Log In submitted:", validatedData.data);

  return {
    success: true,
    message: "Login successfull!",
  };
}
