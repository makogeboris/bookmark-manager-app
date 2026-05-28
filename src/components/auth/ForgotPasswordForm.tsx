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
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import Logo from "./Logo";

export function ForgotPasswordForm({
  className,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card className="card-shadow dark:border-border gap-8 border border-transparent sm:py-8">
        <CardHeader className="sm:px-8">
          <Logo />

          <div className="flex flex-col gap-1.5">
            <CardTitle>Forgot your password?</CardTitle>
            <CardDescription>
              Enter your email address below and we’ll send you a link to reset
              your password.
            </CardDescription>
          </div>
        </CardHeader>

        <CardContent className="sm:px-8">
          <form>
            <FieldGroup>
              <Field>
                <FieldLabel htmlFor="email">Email</FieldLabel>
                <Input
                  id="email"
                  type="email"
                  placeholder="m@example.com"
                  required
                />
              </Field>

              <Field>
                <Button size="xxl" type="submit">
                  Send reset link
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
