"use client";

import { useForm, type Resolver } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState, useTransition } from "react";
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
import { Spinner } from "../ui/spinner";

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
  const [isGoogleLoading, setIsGoogleLoading] = useState(false);
  const [isResending, setIsResending] = useState(false);
  const [isDemoPending, startDemoTransition] = useTransition();

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
    try {
      setIsResending(true);

      const result = await resendVerificationAction(unverifiedEmail);

      setResendStatus(result.message);
    } finally {
      setIsResending(false);
    }
  }

  async function handleGoogleSignIn() {
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

  function handleDemoLogin() {
    startDemoTransition(() => {
      router.push("/demo");
    });
  }

  const authInProgress =
    isSubmitting || isGoogleLoading || isResending || isDemoPending;

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
                        <Button
                          type="button"
                          onClick={handleResendVerification}
                          disabled={authInProgress}
                          className="text-primary mt-1 underline underline-offset-4 disabled:opacity-50"
                        >
                          <span className="flex items-center gap-2">
                            {isResending && (
                              <Spinner data-icon="inline-start" />
                            )}
                            <span>
                              {isResending
                                ? "Sending..."
                                : "Resend verification email"}
                            </span>
                          </span>
                        </Button>
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
                      disabled={authInProgress}
                    />
                    {errors.email && (
                      <FieldError>{errors.email.message}</FieldError>
                    )}
                  </Field>

                  <Field>
                    <div className="flex items-center">
                      <FieldLabel htmlFor="password">Password</FieldLabel>
                      <Link
                        href={authInProgress ? "#" : "/forgot-password"}
                        aria-disabled={authInProgress}
                        tabIndex={authInProgress ? -1 : undefined}
                        className={cn(
                          "text-muted-foreground ml-auto inline-block text-xs underline-offset-4 hover:underline",
                          authInProgress && "pointer-events-none opacity-50",
                        )}
                      >
                        Forgot your password?
                      </Link>
                    </div>
                    <PasswordInput
                      id="password"
                      {...register("password")}
                      disabled={authInProgress}
                    />
                    {errors.password && (
                      <FieldError>{errors.password.message}</FieldError>
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
                        <span>{isSubmitting ? "Logging in..." : "Login"}</span>
                      </span>
                    </Button>

                    <Button
                      size="lg"
                      variant="outline"
                      type="button"
                      onClick={handleGoogleSignIn}
                      disabled={authInProgress}
                      className="px-4 py-5 text-sm sm:px-6 sm:py-5.5 sm:text-base"
                    >
                      <span className="flex items-center gap-2">
                        {isGoogleLoading && (
                          <Spinner data-icon="inline-start" />
                        )}
                        <span>
                          {isGoogleLoading
                            ? "Redirecting..."
                            : "Login with Google"}
                        </span>
                      </span>
                    </Button>
                  </Field>

                  <Field className="mt-2">
                    <FieldDescription className="flex items-center justify-center gap-1.5 text-center">
                      Don&apos;t have an account?{" "}
                      <Link
                        href={authInProgress ? "#" : "/signup"}
                        aria-disabled={authInProgress}
                        tabIndex={authInProgress ? -1 : undefined}
                        className={cn(
                          "font-medium",
                          authInProgress && "pointer-events-none opacity-50",
                        )}
                      >
                        Sign up
                      </Link>
                    </FieldDescription>
                  </Field>

                  <FieldSeparator className="my-2 sm:my-3" />

                  <Button
                    size="lg"
                    variant="demo"
                    type="button"
                    onClick={handleDemoLogin}
                    disabled={authInProgress}
                    className="px-4 py-5 text-sm sm:px-6 sm:py-5.5 sm:text-base"
                  >
                    <span className="flex items-center gap-2">
                      {isDemoPending && <Spinner data-icon="inline-start" />}
                      <span>
                        {isDemoPending ? "Loading demo..." : "Try the demo"}
                      </span>
                    </span>
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
