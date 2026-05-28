import Image from "next/image";

export default function Logo() {
  return (
    <>
      <div className="h-8 w-auto dark:hidden">
        <Image
          loading="eager"
          src="/images/logo-light-theme.svg"
          alt="Bookmark Manager"
          width={160}
          height={32}
          className="h-full w-auto"
        />
      </div>
      <div className="hidden h-8 w-auto dark:block">
        <Image
          loading="eager"
          src="/images/logo-dark-theme.svg"
          alt="Bookmark Manager"
          width={160}
          height={32}
          className="h-full w-auto"
        />
      </div>
    </>
  );
}
