"use client";
import { Button } from "@/components/ui/button";
import NavLink from "./navlink";
import { Menu } from "lucide-react";

const Links = () => {
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
      <Button variant="outline" className="peer block md:hidden">
        <Menu />
      </Button>
      <div className="left-0 right-0 top-14 hidden items-center gap-4 rounded-lg bg-background peer-focus:absolute peer-focus:flex peer-focus:justify-evenly peer-focus:shadow-lg md:static md:flex">
        {routes.map((route) => (
          <NavLink key={route.path} item={route} />
        ))}
      </div>
    </div>
  );
};

export default Links;
