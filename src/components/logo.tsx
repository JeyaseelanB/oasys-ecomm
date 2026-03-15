import Image from "next/image";

export function Logo() {
  return (
    <div className="relative h-8 max-w-[10.847rem]">
      <Image
        src={"/images/logo/logo.svg"}
        fill
        className="dark:hidden"
        alt="Co-optex logo"
        role="presentation"
        quality={100}
      />

      <Image
        src={"/images/logo/logo-dark.svg"}
        fill
        className="hidden dark:block"
        alt="Co-optex logo"
        role="presentation"
        quality={100}
      />
    </div>
  );
}

export function LogoIcon() {
  return (
    <Image
      src={"/images/logo/logo-icon.svg"}
      width={32}
      height={32}
      alt="Co-optex"
      role="presentation"
    />
  );
}
