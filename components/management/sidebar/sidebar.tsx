"use client";
import { Button } from "@/components/ui/button";
import {
  ChevronLeft,
  ChevronRight,
  Edit,
  File,
  Layers2,
  LayoutDashboard,
  Megaphone,
  Settings,
  User,
} from "lucide-react";
import SidebarItem from "./sidebar-item";
import SidebarLogo from "./sidebar-logo";
import SidebarAccount from "./sidebar-account";
import { ModeToggle } from "@/components/ui/theme-toggle";
import { useState } from "react";
import { useSession } from "next-auth/react";

const routes = [
  {
    icon: <LayoutDashboard />,
    path: "/management",
    text: "Dashboard",
    notAllow: ["USER"],
  },
  {
    icon: <Megaphone />,
    path: "/management/notifications",
    text: "Notifications",
    notAllow: ["WRITER", "USER"],
  },
  {
    icon: <Edit />,
    path: "/management/editor",
    text: "Text Editor",
    notAllow: ["USER"],
  },
  {
    icon: <File />,
    path: "/management/threads",
    text: "Threads",
    notAllow: ["USER"],
  },
  {
    icon: <User />,
    path: "/management/users",
    text: "Users",
    notAllow: ["WRITER", "USER"],
  },
];

const Sidebar = () => {
  const [expanded, setExpanded] = useState(false);
  const session = useSession();
  const user: any = session?.data?.user;

  return (
    <aside className="relative flex h-screen w-fit flex-col">
      <Button
        className="absolute -right-3 top-5 h-[24px] w-[24px] rounded-full p-0"
        onClick={() => setExpanded(!expanded)}
      >
        {expanded === true ? (
          <ChevronLeft size={20} />
        ) : (
          <ChevronRight size={20} />
        )}
      </Button>
      <nav className="flex h-full flex-col p-2 md:p-4">
        <SidebarLogo expanded={expanded} />
        <div className="border-b-2 border-border py-2">
          {user &&
            routes.map(
              (route) =>
                !route.notAllow.find((r) => r === user.role) && (
                  <SidebarItem
                    {...route}
                    key={route.path}
                    expanded={expanded}
                  />
                ),
            )}
        </div>
        <div className="py-2">
          <SidebarItem
            path="/management/users"
            icon={<Settings />}
            text="Settings"
            expanded={expanded}
            notAllow={[]}
          />
          <div className="relative my-1 flex items-center rounded-md py-2 font-medium text-foreground transition-colors">
            <ModeToggle
              text={expanded === true ? "Theme" : undefined}
              className="flex w-full items-center gap-2 px-2 text-base"
            />
          </div>
        </div>
      </nav>
      <SidebarAccount expanded={expanded} />
    </aside>
  );
};

export default Sidebar;
