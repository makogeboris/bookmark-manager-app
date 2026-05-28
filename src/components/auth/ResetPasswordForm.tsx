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
import Link from "next/link";
import Logo from "./Logo";
import PasswordInput from "./PasswordInput";

export function ResetPasswordForm({
  className,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card className="card-shadow dark:border-border gap-8 border border-transparent sm:py-8">
        <CardHeader className="sm:px-8">
          <Logo />

          <div className="flex flex-col gap-1.5">
            <CardTitle>Reset Your Password</CardTitle>
            <CardDescription>
              Enter your new password below. Make sure it’s strong and secure.
            </CardDescription>
          </div>
        </CardHeader>

        <CardContent className="sm:px-8">
          <form>
            <FieldGroup>
              <Field>
                <FieldLabel htmlFor="password">New Password</FieldLabel>
                <PasswordInput id="password" />

                <FieldDescription className="text-xs">
                  Must be at least 8 characters long.
                </FieldDescription>
              </Field>

              <Field>
                <FieldLabel htmlFor="password">Confirm Password</FieldLabel>
                <PasswordInput id="password" />
                <FieldError></FieldError>
              </Field>

              <Field className="mt-2">
                <Button size="xxl" type="submit">
                  Reset password
                </Button>
              </Field>

              <Field className="mt-2">
                <FieldDescription className="flex items-center justify-center gap-1.5 text-center">
                  <Link href="/login">Back to login</Link>
                </FieldDescription>
              </Field>
            </FieldGroup>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
