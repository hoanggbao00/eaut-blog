import { Separator } from "@/components/ui/separator";
import Link from "next/link";
import Image from "next/image";

const HeaderLogo = () => {
  return (
    <Link className="flex h-12 items-center gap-2" href="/">
      <div className="relative aspect-square h-full">
        <Image
          src="/eaut-logo.webp"
          alt="eaut-logo"
          fill
          className="object-cover"
        />
      </div>
      <Separator orientation="vertical" className="w-[2px] bg-primary/30" />
      <div className="text-xl font-semibold text-primary hidden md:block">
        <h2>EAUT</h2>
        <h2>Khoa Công nghệ thông tin</h2>
      </div>
    </Link>
  );
};

export default HeaderLogo;
