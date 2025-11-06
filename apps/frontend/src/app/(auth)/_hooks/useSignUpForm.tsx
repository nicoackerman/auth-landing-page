"use client";

import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm, type SubmitHandler } from "react-hook-form";
import type { ResData } from "~/app/api/auth/signup/route";
import type { BoomError } from "~/entities/errors/api";
import { tryCatchAsync } from "~/utils/tryCatch";
import { SignUpSchema } from "~/interface-adapters/schemas/signup.schema";

interface FormResult {
  success: boolean;
  message: string;
}

type FormFields = z.infer<typeof SignUpSchema>;

export function useSignUpForm() {
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
  } = useForm<FormFields>({
    defaultValues: {
      email: "",
    },
    resolver: zodResolver(SignUpSchema),
  });
  const [result, setResult] = useState<FormResult | null>(null);

  const onSubmit: SubmitHandler<FormFields> = async (data) => {
    const { data: apiRes, error: apiError } = await tryCatchAsync(
      fetch("/api/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      }),
    );

    if (apiError) {
      return setResult({
        success: false,
        message: "An unexpected api error occurred",
      });
    }

    const apiData: BoomError | ResData = await apiRes.json();

    if ("isBoom" in apiData) {
      return setResult({
        success: false,
        message: apiData.output.payload.message,
      });
    }

    return setResult({
      success: true,
      message: "Your account was created successfully",
    });
  };

  return {
    result,
    register,
    handleSubmit,
    onSubmit,
    setError,
    errors,
    isSubmitting,
  };
}
