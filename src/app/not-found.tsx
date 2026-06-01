import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex min-h-screen items-center justify-center px-6">
      <div className="flex max-w-md flex-col items-center gap-8 text-center">
        <p className="text-accent dark:text-chart-4/20 text-[120px] leading-none font-extrabold tracking-tighter sm:text-[160px]">
          404
        </p>

        <div className="flex flex-col gap-3">
          <h1 className="text-foreground text-2xl font-extrabold tracking-tight sm:text-3xl">
            Page not found
          </h1>
          <p className="text-muted-foreground text-sm leading-relaxed sm:text-base">
            The page you&apos;re looking for doesn&apos;t exist or has been
            moved. Double-check the URL or head back home.
          </p>
        </div>

        <div className="flex w-full flex-col items-center gap-3 sm:w-auto sm:flex-row">
          <Link
            href="/"
            className="bg-primary text-primary-foreground hover:bg-primary/80 flex items-center justify-center rounded-md px-5 py-2.5 text-center text-sm font-semibold transition-all duration-200"
          >
            Back to home
          </Link>
          <Link
            href="/login"
            className="border-input text-foreground hover:bg-input/10 inline-flex items-center justify-center rounded-md border px-5 py-2.5 text-center text-sm font-semibold transition-all duration-200"
          >
            Sign in
          </Link>
        </div>
      </div>
    </div>
  );
}
