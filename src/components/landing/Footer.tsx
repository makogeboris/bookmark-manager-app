import Logo from "../shared/Logo";
import { ThemeToggle } from "../shared/ThemeToggle ";
import { Icons } from "../shared/Icons";
import Link from "next/link";

export function Footer() {
  return (
    <footer
      className="border-border relative border-t px-6 py-10 lg:px-16"
      style={{ zIndex: 1 }}
    >
      <div className="mx-auto flex flex-col items-center justify-between gap-6 md:flex-row">
        <Link href="/" aria-label="Go to the Bookmark homepage">
          <Logo />
        </Link>

        <div className="flex flex-col items-center gap-3 md:flex-row">
          <div className="flex items-center gap-3">
            <Link
              href="https://github.com/makogeboris/bookmark-manager-app"
              aria-label="View the Bookmark Manager source code on GitHub"
              target="_blank"
              rel="noopener noreferrer"
            >
              {Icons.github}
            </Link>

            <ThemeToggle />
          </div>

          <p className="text-muted-foreground text-sm">
            © {new Date().getFullYear()} Bookmark. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
