"use server";

import type { SignUpActionResponse } from "~/types/actionsResponses";
import { SignUpSchema } from "~/types/user";
import { tryCatchSync } from "~/utils/tryCatch";

export async function submitSignUp(
  prevState: SignUpActionResponse | null,
  formData: FormData,
): Promise<SignUpActionResponse> {
  const { data: rawData, error } = tryCatchSync(() => {
    return {
      username: formData.get("username") as string,
      email: formData.get("email") as string,
      password: formData.get("password") as string,
      confirmPassword: formData.get("confirmPassword") as string,
    };
  });

  if (error) {
    return {
      success: false,
      message: "An unexpected error occurred",
    };
  }

  const validatedData = SignUpSchema.safeParse(rawData);

  if (!validatedData.success) {
    console.log(validatedData.error.errors);
    console.log(rawData);
    return {
      success: false,
      message: "Please fix the errors in the form",
      errors: validatedData.error.flatten().fieldErrors,
    };
  }

  return {
    success: true,
    message: "Sign Up successfull!",
  };
}
