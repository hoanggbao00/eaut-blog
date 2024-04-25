"use client";

import Links from "./links";
import { useSession } from "next-auth/react";
import AuthDialog from "./auth-dialog";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { ModeToggle } from "@/components/ui/theme-toggle";
import { Dialog } from "@/components/ui/dialog";
import HeaderLogo from "./header-logo";
import HeaderAccount from "./header-account";
import SearchBar from "./search-bar";

const Header = () => {
  const session = useSession();
  const router = useRouter();
  const params = useSearchParams();
  const pathName = usePathname();

  const [open, setOpen] = useState<boolean>(false);

  useEffect(() => {
    const value = params.get("login");

    if (!!!value || value !== "open") return;

    if (session?.data?.user) return setOpen(false);
    setOpen(true);
  }, [params]);

  const handleOpenChange = () => {
    if (open) router.replace(pathName);
    else router.replace("?login=open");
    setOpen(!open);
  };

  return (
    <Dialog
      open={open || !!session?.data?.user}
      onOpenChange={handleOpenChange}
    >
      <div className="px-3 sticky top-0 z-[2] flex h-16 items-center bg-background sm:container">
        <nav className="relative flex flex-1 justify-between ">
          <HeaderLogo />
          <div className="flex items-center gap-4">
            <SearchBar />
            <Links />
            <>
              {session.data ? (
                <HeaderAccount data={session.data?.user}/>
              ) : (
                <AuthDialog setOpen={handleOpenChange} />
              )}
            </>
            <ModeToggle />
          </div>
        </nav>
      </div>
    </Dialog>
  );
};

export default Header;
