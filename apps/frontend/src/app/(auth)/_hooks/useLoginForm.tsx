"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { type SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";
import type { ResData } from "~/app/api/auth/login/route";
import type { BoomError } from "~/entities/errors/api";
import { LogInSchema } from "~/interface-adapters/schemas/login.schema";
import { tryCatchAsync } from "~/utils/tryCatch";

interface FormResult {
  success: boolean;
  message: string;
}

type FormFields = z.infer<typeof LogInSchema>;

export function useLoginForm() {
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
  } = useForm<FormFields>({
    defaultValues: {
      email: "",
    },
    resolver: zodResolver(LogInSchema),
  });
  const [result, setResult] = useState<FormResult | null>(null);

  const onSubmit: SubmitHandler<FormFields> = async (data) => {
    const { data: apiRes, error: apiError } = await tryCatchAsync(
      fetch("/api/auth/login", {
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
      message: "Successfull login",
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
