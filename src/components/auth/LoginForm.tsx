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
  FieldSeparator,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import Logo from "./Logo";
import PasswordInput from "./PasswordInput";

export function LoginForm({
  className,
  ...props
}: React.ComponentProps<"div">) {
  return (
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
                <div className="flex items-center">
                  <FieldLabel htmlFor="password">Password</FieldLabel>
                  <Link
                    href="/forgot-password"
                    className="text-muted-foreground ml-auto inline-block text-xs underline-offset-4 hover:underline"
                  >
                    Forgot your password?
                  </Link>
                </div>
                <PasswordInput id="password" />
              </Field>

              <Field className="mt-2 gap-3">
                <Button
                  size="lg"
                  type="submit"
                  className="px-4 py-5 text-sm sm:px-6 sm:py-5.5 sm:text-base"
                >
                  Login
                </Button>

                <Button
                  size="lg"
                  variant="outline"
                  type="button"
                  className="px-4 py-5 text-sm sm:px-6 sm:py-5.5 sm:text-base"
                >
                  Login with Google
                </Button>
              </Field>

              <Field className="mt-2">
                <FieldDescription className="flex items-center justify-center gap-1.5 text-center">
                  Don&apos;t have an account?
                  <Link href="/signup">Sign up</Link>
                </FieldDescription>
              </Field>

              <FieldSeparator className="my-2 sm:my-3" />

              <Button
                size="lg"
                variant="demo"
                type="button"
                className="px-4 py-5 text-sm sm:px-6 sm:py-5.5 sm:text-base"
              >
                Try the demo
              </Button>
            </FieldGroup>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
