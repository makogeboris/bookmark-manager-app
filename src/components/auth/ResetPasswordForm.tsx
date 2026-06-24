"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Field,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import Logo from "../shared/Logo";
import PasswordInput from "./PasswordInput";
import {
  resetPasswordSchema,
  type ResetPasswordSchema,
} from "@/lib/validations/auth";
import { resetPasswordAction } from "@/lib/actions/auth";
import { Spinner } from "../ui/spinner";

export function ResetPasswordForm({
  className,
  ...props
}: React.ComponentProps<"div">) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const token = searchParams.get("token");

  const [serverError, setServerError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<ResetPasswordSchema>({
    resolver: zodResolver(resetPasswordSchema),
  });

  const authInProgress = isSubmitting;

  async function onSubmit(values: ResetPasswordSchema) {
    setServerError(null);

    if (!token) {
      setServerError(
        "Invalid or expired reset link. Please request a new one.",
      );
      return;
    }

    const result = await resetPasswordAction({
      password: values.password,
      token,
    });

    if (!result.success) {
      setServerError(result.message);
      return;
    }

    router.push("/login?reset=success");
  }

  if (!token) {
    return (
      <div className={cn("flex flex-col gap-6", className)} {...props}>
        <Card className="card-shadow dark:border-border gap-8 border border-transparent sm:py-8">
          <CardHeader className="sm:px-8">
            <Logo />
            <div className="flex flex-col gap-1.5">
              <CardTitle>Invalid reset link</CardTitle>
              <CardDescription>
                This password reset link is invalid or has expired.{" "}
                <Link
                  href="/forgot-password"
                  className="underline underline-offset-4"
                >
                  Request a new one.
                </Link>
              </CardDescription>
            </div>
          </CardHeader>
        </Card>
      </div>
    );
  }

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card className="card-shadow dark:border-border gap-8 border border-transparent sm:py-8">
        <CardHeader className="sm:px-8">
          <Logo />
          <div className="flex flex-col gap-1.5">
            <CardTitle>Reset Your Password</CardTitle>
            <CardDescription>
              Enter your new password below. Make sure it&apos;s strong and
              secure.
            </CardDescription>
          </div>
        </CardHeader>

        <CardContent className="sm:px-8">
          <form onSubmit={handleSubmit(onSubmit)}>
            <FieldGroup>
              {serverError && (
                <p className="text-destructive text-sm">{serverError}</p>
              )}

              <Field>
                <FieldLabel htmlFor="password">New Password</FieldLabel>

                <PasswordInput
                  id="password"
                  {...register("password")}
                  disabled={authInProgress}
                />

                <FieldDescription className="text-xs">
                  Must be at least 8 characters long.
                </FieldDescription>
                {errors.password && (
                  <FieldError>{errors.password.message}</FieldError>
                )}
              </Field>

              <Field>
                <FieldLabel htmlFor="confirmPassword">
                  Confirm Password
                </FieldLabel>

                <PasswordInput
                  id="confirmPassword"
                  {...register("confirmPassword")}
                  disabled={authInProgress}
                />
                {errors.confirmPassword && (
                  <FieldError>{errors.confirmPassword.message}</FieldError>
                )}
              </Field>

              <Field className="mt-2">
                <Button
                  size="lg"
                  type="submit"
                  disabled={authInProgress}
                  className="px-4 py-5 text-sm sm:px-6 sm:py-5.5 sm:text-base"
                >
                  <span className="flex items-center gap-2">
                    {authInProgress && <Spinner data-icon="inline-start" />}
                    <span>
                      {authInProgress ? "Resetting..." : "Reset password"}
                    </span>
                  </span>
                </Button>
              </Field>

              <Field className="mt-2">
                <FieldDescription className="flex items-center justify-center gap-1.5 text-center">
                  <Link
                    href={authInProgress ? "#" : "/login"}
                    aria-disabled={authInProgress}
                    tabIndex={authInProgress ? -1 : undefined}
                    className={cn(
                      "font-medium",
                      authInProgress && "pointer-events-none opacity-50",
                    )}
                  >
                    Back to login
                  </Link>
                </FieldDescription>
              </Field>
            </FieldGroup>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
