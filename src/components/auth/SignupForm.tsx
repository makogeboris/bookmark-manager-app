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

export function SignupForm({ ...props }: React.ComponentProps<typeof Card>) {
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
        <form>
          <FieldGroup>
            <Field>
              <FieldLabel htmlFor="name">Full Name</FieldLabel>
              <Input id="name" type="text" placeholder="John Doe" required />
            </Field>

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
              <FieldLabel htmlFor="password">Password</FieldLabel>
              <PasswordInput id="password" />

              <FieldDescription className="text-xs">
                Must be at least 8 characters long.
              </FieldDescription>
            </Field>

            <Field className="mt-2 gap-3">
              <Button
                size="lg"
                type="submit"
                className="px-4 py-5 text-sm sm:px-6 sm:py-5.5 sm:text-base"
              >
                Create Account
              </Button>

              <Button
                size="lg"
                variant="outline"
                type="button"
                className="px-4 py-5 text-sm sm:px-6 sm:py-5.5 sm:text-base"
              >
                Sign up with Google
              </Button>
            </Field>

            <Field className="mt-2">
              <FieldDescription className="flex items-center justify-center gap-1.5 text-center">
                Already have an account? <Link href="/login">Log in</Link>
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
  );
}
