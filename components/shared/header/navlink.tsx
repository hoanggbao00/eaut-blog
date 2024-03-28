"use client";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";

const NavLink = ({ item }: { item: { path: string; title: string } }) => {
  const pathname = usePathname();

  return (
    <Link
      href={item.path}
      className={cn(
        `flex items-center p-2 text-center font-semibold transition-all hover:scale-105 hover:text-primary text-nowrap`,
        {
          "text-primary": item.path === pathname,
        },
      )}
    >
      {item.title}
    </Link>
  );
};

export default NavLink;
