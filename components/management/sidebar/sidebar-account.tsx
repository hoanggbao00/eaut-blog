"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { MoreVertical } from "lucide-react";
import { useSession } from "next-auth/react";
import RoleTag from "../users/role-tag";

const SidebarAccount = ({ expanded }: { expanded: boolean }) => {
  const session = useSession();
  const user:any = session?.data?.user

  return (
    <div className="flex border-t p-3 pb-2">
      <div className="m-auto aspect-square w-11 overflow-hidden rounded-lg p-1.5 hover:bg-primary/30">
        <Avatar className="h-full w-full">
          <AvatarImage
            src={user?.image || ''}
            className="h-full w-full object-cover"
          />
          <AvatarFallback>HB</AvatarFallback>
        </Avatar>
      </div>
      <div
        className={cn(
          "ml-1 flex w-52 items-center justify-between overflow-hidden rounded-lg transition-all",
          {
            "ml-0 w-0": expanded === false,
          },
        )}
      >
        <div className="rounded-lg px-2 py-1.5 leading-4 hover:bg-yellow-300/30">
          <div className="flex items-center gap-2">
            <h4 className="font-semibold">{user?.name}</h4>
            <RoleTag role={user?.role}/>
          </div>
          <span className="text-xs text-gray-600 dark:text-gray-400">
            {user?.email}
          </span>
        </div>
        <Button variant="ghost" className="ml-1 p-0 px-1">
          <MoreVertical />
        </Button>
      </div>
    </div>
  );
};

export default SidebarAccount;
