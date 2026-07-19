"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
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
import { Input } from "@/components/ui/input";
import Logo from "../shared/Logo";
import PasswordInput from "./PasswordInput";
import { signUpSchema, type SignUpSchema } from "@/lib/validations/auth";
import { signUpAction } from "@/lib/actions/auth";
import { authClient } from "@/lib/auth-client";
import { Spinner } from "@/components/ui/spinner";
import clsx from "clsx";
import { Icons } from "../shared/Icons";

export function SignupForm({ ...props }: React.ComponentProps<typeof Card>) {
  const [serverError, setServerError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const [isGoogleLoading, setIsGoogleLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<SignUpSchema>({
    resolver: zodResolver(signUpSchema),
  });

  async function onSubmit(values: SignUpSchema) {
    setServerError(null);
    const result = await signUpAction({
      name: values.name,
      email: values.email,
      password: values.password,
    });

    if (!result.success) {
      setServerError(result.message);
      return;
    }

    setSuccess(true);
  }

  async function handleGoogleSignUp() {
    try {
      setIsGoogleLoading(true);

      await authClient.signIn.social({
        provider: "google",
        callbackURL: "/dashboard",
      });
    } finally {
      setIsGoogleLoading(false);
    }
  }

  const authInProgress = isSubmitting || isGoogleLoading;

  if (success) {
    return (
      <Card
        {...props}
        className="card-shadow dark:border-border gap-8 border border-transparent sm:py-8"
      >
        <CardHeader className="sm:px-8">
          <Logo />
          <div className="flex flex-col gap-1.5">
            <CardTitle>Check your email</CardTitle>
            <CardDescription>
              We sent you a verification link. Please check your inbox and click
              the link to activate your account.
            </CardDescription>
          </div>
        </CardHeader>
      </Card>
    );
  }

  return (
    <Card
      {...props}
      className="card-shadow dark:border-border gap-8 border border-transparent sm:py-8"
    >
      <CardHeader className="sm:px-8">
        <Logo />
        <div className="flex flex-col gap-1.5">
          <CardTitle>Create an account</CardTitle>
          <CardDescription>
            Enter your information below to create your account
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
              <FieldLabel htmlFor="name">Full Name</FieldLabel>
              <Input
                id="name"
                type="text"
                placeholder="John Doe"
                {...register("name")}
                disabled={authInProgress}
              />
              {errors.name && <FieldError>{errors.name.message}</FieldError>}
            </Field>

            <Field>
              <FieldLabel htmlFor="email">Email</FieldLabel>
              <Input
                id="email"
                type="email"
                placeholder="m@example.com"
                {...register("email")}
                disabled={authInProgress}
              />
              {errors.email && <FieldError>{errors.email.message}</FieldError>}
            </Field>

            <Field>
              <FieldLabel htmlFor="password">Password</FieldLabel>
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

            <Field className="mt-2 gap-3">
              <Button
                size="lg"
                type="submit"
                disabled={authInProgress}
                className="px-4 py-5 text-sm sm:px-6 sm:py-5.5 sm:text-base"
              >
                <span className="flex items-center gap-2">
                  {isSubmitting && <Spinner data-icon="inline-start" />}
                  <span>
                    {isSubmitting ? "Creating account..." : "Create Account"}
                  </span>
                </span>
              </Button>

              <Button
                size="lg"
                variant="outline"
                type="button"
                onClick={handleGoogleSignUp}
                disabled={authInProgress}
                className="px-4 py-5 text-sm sm:px-6 sm:py-5.5 sm:text-base"
              >
                <span className="flex items-center gap-2">
                  {isGoogleLoading && <Spinner data-icon="inline-start" />}
                  <span className="flex items-center gap-2">
                    {Icons.google}
                    {isGoogleLoading
                      ? "Redirecting..."
                      : "Continue with Google"}
                  </span>
                </span>
              </Button>
            </Field>

            <Field className="mt-2">
              <FieldDescription className="flex items-center justify-center gap-1.5 text-center">
                Already have an account?{" "}
                <Link
                  href={authInProgress ? "#" : "/login"}
                  aria-disabled={authInProgress}
                  tabIndex={authInProgress ? -1 : undefined}
                  className={clsx(
                    "font-bold",
                    authInProgress && "pointer-events-none opacity-50",
                  )}
                >
                  Login
                </Link>
              </FieldDescription>
            </Field>
          </FieldGroup>
        </form>
      </CardContent>
    </Card>
  );
}
