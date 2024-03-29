"use client";
import { Button } from "@/components/ui/button";
import NavLink from "./navlink";
import { Menu } from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";

const Links = () => {
  const [open, setOpen] = useState<boolean>(false);

  const routes = [
    {
      title: "Home",
      path: "/",
    },
    {
      title: "Blog",
      path: "/blog",
    },
    {
      title: "Sinh viên",
      path: "http://sinhvien.eaut.edu.vn/",
    },
    {
      title: "About",
      path: "/thread/about-us",
    },
  ];

  return (
    <div className="">
      <Button
        variant="outline"
        onClick={() => {
          setOpen(!open);
        }}
        className="block md:hidden"
      >
        <Menu />
      </Button>
      <div
        className={cn(
          `left-0 right-0 top-14 hidden items-center gap-4 rounded-lg bg-background md:static md:flex`,
          {
            "absolute flex justify-evenly shadow-lg": open,
          },
        )}
      >
        {routes.map((route) => (
          <NavLink key={route.path} item={route} />
        ))}
      </div>
    </div>
  );
};

export default Links;
