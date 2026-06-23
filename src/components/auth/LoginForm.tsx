"use client";

import { useForm, type Resolver } from "react-hook-form";
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
  FieldSeparator,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import Logo from "../shared/Logo";
import PasswordInput from "./PasswordInput";
import { signInSchema, type SignInSchema } from "@/lib/validations/auth";
import { signInAction, resendVerificationAction } from "@/lib/actions/auth";
import { authClient } from "@/lib/auth-client";

export function LoginForm({
  className,
  ...props
}: React.ComponentProps<"div">) {
  const searchParams = useSearchParams();
  const resetSuccess = searchParams.get("reset") === "success";

  const router = useRouter();
  const [serverError, setServerError] = useState<string | null>(null);
  const [unverified, setUnverified] = useState(false);
  const [unverifiedEmail, setUnverifiedEmail] = useState("");
  const [resendStatus, setResendStatus] = useState<string | null>(null);

  // 1. Type the form explicitly so inferred type is resolved
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<SignInSchema>({
    resolver: zodResolver(signInSchema) as Resolver<SignInSchema>,
    defaultValues: { rememberMe: false },
  });

  async function onSubmit(values: SignInSchema) {
    setServerError(null);
    setUnverified(false);
    setResendStatus(null);

    const result = await signInAction(values);

    if (!result.success) {
      if (result.unverified) {
        setUnverified(true);
        setUnverifiedEmail(values.email);
        return;
      }
      setServerError(
        result.message ?? "Something went wrong. Please try again.",
      );
      return;
    }

    router.push("/dashboard");
    router.refresh();
  }

  async function handleResendVerification() {
    const result = await resendVerificationAction(unverifiedEmail);
    setResendStatus(result.message);
  }

  async function handleGoogleSignIn() {
    await authClient.signIn.social({
      provider: "google",
      callbackURL: "/dashboard",
    });
  }

  return (
    <>
      {resetSuccess && (
        <p className="text-sm text-green-600">
          Password reset successfully. Please log in.
        </p>
      )}

      {
        <div className={cn("flex flex-col gap-6", className)} {...props}>
          <Card className="card-shadow dark:border-border gap-8 border border-transparent sm:py-8">
            <CardHeader className="sm:px-8">
              <Logo />
              <div className="flex flex-col gap-1.5">
                <CardTitle>Login to your account</CardTitle>
                <CardDescription>
                  Welcome back! Please enter your details.
                </CardDescription>
              </div>
            </CardHeader>

            <CardContent className="sm:px-8">
              <form onSubmit={handleSubmit(onSubmit)}>
                <FieldGroup>
                  {serverError && (
                    <p className="text-destructive text-sm">{serverError}</p>
                  )}

                  {unverified && (
                    <div className="bg-accent rounded-lg p-3 text-sm">
                      <p>Your email is not verified.</p>
                      {resendStatus ? (
                        <p className="text-muted-foreground mt-1">
                          {resendStatus}
                        </p>
                      ) : (
                        <button
                          type="button"
                          onClick={handleResendVerification}
                          className="text-primary mt-1 underline underline-offset-4"
                        >
                          Resend verification email
                        </button>
                      )}
                    </div>
                  )}

                  <Field>
                    <FieldLabel htmlFor="email">Email</FieldLabel>
                    <Input
                      id="email"
                      type="email"
                      placeholder="m@example.com"
                      {...register("email")}
                    />
                    {errors.email && (
                      <FieldError>{errors.email.message}</FieldError>
                    )}
                  </Field>

                  <Field>
                    <div className="flex items-center">
                      <FieldLabel htmlFor="password">Password</FieldLabel>
                      <Link
                        href="/forgot-password"
                        className="text-muted-foreground ml-auto inline-block text-xs underline-offset-4 hover:underline"
                      >
                        Forgot your password?
                      </Link>
                    </div>
                    <PasswordInput id="password" {...register("password")} />
                    {errors.password && (
                      <FieldError>{errors.password.message}</FieldError>
                    )}
                  </Field>

                  <Field className="mt-2 gap-3">
                    <Button
                      size="lg"
                      type="submit"
                      disabled={isSubmitting}
                      className="px-4 py-5 text-sm sm:px-6 sm:py-5.5 sm:text-base"
                    >
                      {isSubmitting ? "Logging in..." : "Login"}
                    </Button>

                    <Button
                      size="lg"
                      variant="outline"
                      type="button"
                      onClick={handleGoogleSignIn}
                      className="px-4 py-5 text-sm sm:px-6 sm:py-5.5 sm:text-base"
                    >
                      Login with Google
                    </Button>
                  </Field>

                  <Field className="mt-2">
                    <FieldDescription className="flex items-center justify-center gap-1.5 text-center">
                      Don&apos;t have an account?{" "}
                      <Link href="/signup">Sign up</Link>
                    </FieldDescription>
                  </Field>

                  <FieldSeparator className="my-2 sm:my-3" />

                  <Button
                    size="lg"
                    variant="demo"
                    type="button"
                    onClick={() => router.push("/demo")}
                    className="px-4 py-5 text-sm sm:px-6 sm:py-5.5 sm:text-base"
                  >
                    Try the demo
                  </Button>
                </FieldGroup>
              </form>
            </CardContent>
          </Card>
        </div>
      }
    </>
  );
}
