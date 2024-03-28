import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { LayoutDashboard, LogOut, Settings } from "lucide-react";
import { User } from "next-auth";
import { signOut } from "next-auth/react";
import Link from "next/link";
import { Role } from "@/type";

const HeaderAccount = ({ data }: { data: User & { role: Role } }) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <div className="flex items-center rounded-lg bg-primary/30 p-1 hover:bg-primary/50">
          <Avatar className="h-[32px] w-[32px]">
            <AvatarImage
              src={data.image || ""}
              alt="avatar"
              className="h-full w-full"
            />
            <AvatarFallback>HB</AvatarFallback>
          </Avatar>
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="max-w-[200px]">
        <DropdownMenuLabel>
          <p className="text-center">{data.name}</p>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        {data.role !== "USER" && data.role !== "NONE" && (
          <DropdownMenuItem>
            <Link href={`management`} className="flex w-full">
              <LayoutDashboard className="mr-2" size={20} />
              Management
            </Link>
          </DropdownMenuItem>
        )}
        <DropdownMenuItem>
          <Link
            href={`management/users?user=${data.id}`}
            className="flex w-full"
          >
            <Settings className="mr-2" size={20} />
            Settings
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => signOut()}>
          <LogOut className="mr-2" size={20} />
          Sign out
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default HeaderAccount;
