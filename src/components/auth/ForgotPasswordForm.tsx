"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
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
import { Input } from "@/components/ui/input";
import Logo from "../shared/Logo";
import {
  forgotPasswordSchema,
  type ForgotPasswordSchema,
} from "@/lib/validations/auth";
import { forgotPasswordAction } from "@/lib/actions/auth";
import { Spinner } from "../ui/spinner";

export function ForgotPasswordForm({
  className,
  ...props
}: React.ComponentProps<"div">) {
  const [serverMessage, setServerMessage] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<ForgotPasswordSchema>({
    resolver: zodResolver(forgotPasswordSchema),
  });

  async function onSubmit(values: ForgotPasswordSchema) {
    setServerMessage(null);
    const result = await forgotPasswordAction(values);
    setServerMessage(result.message);
  }

  const authInProgress = isSubmitting;

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card className="card-shadow dark:border-border gap-8 border border-transparent sm:py-8">
        <CardHeader className="sm:px-8">
          <Logo />
          <div className="flex flex-col gap-1.5">
            <CardTitle>Forgot your password?</CardTitle>
            <CardDescription>
              Enter your email address below and we&apos;ll send you a link to
              reset your password.
            </CardDescription>
          </div>
        </CardHeader>

        <CardContent className="sm:px-8">
          <form onSubmit={handleSubmit(onSubmit)}>
            <FieldGroup>
              {serverMessage && (
                <p className="text-muted-foreground text-sm">{serverMessage}</p>
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
                <Button
                  size="lg"
                  type="submit"
                  disabled={authInProgress}
                  className="px-4 py-5 text-sm sm:px-6 sm:py-5.5 sm:text-base"
                >
                  <span className="flex items-center gap-2">
                    {authInProgress && <Spinner data-icon="inline-start" />}
                    <span>
                      {authInProgress ? "Sending..." : "Send reset link"}
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
