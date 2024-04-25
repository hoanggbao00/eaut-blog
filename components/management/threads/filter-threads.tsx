"use client";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Category, Role, User } from "@prisma/client";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const FilterThreads = ({
  page,
  category,
  role,
  writers,
}: {
  page: number;
  category: Category[];
  role: Role;
  writers: false | Pick<User, "id" | "image" | "name">[];
}) => {
  const pathname = usePathname();
  const router = useRouter();
  const [input, setInput] = useState("");
  const [catSlug, setCatSlug] = useState("");
  const [userId, setUserId] = useState("");

  useEffect(() => {
    const timer = setTimeout(() => {
      router.replace(
        `${pathname}?page=${page}${input !== "" ? `&q=${input}` : ""}${catSlug ? `&catSlug=${catSlug}` : ""}${userId ? `&userId=${userId}` : ""}`,
      );
    }, 1000);

    return () => clearTimeout(timer);
  }, [input, catSlug, userId]);

  return (
    <div className="flex items-center gap-3">
      <div>
        <Label htmlFor="searchTerms">Title or content</Label>
        <Input
          id="searchTerms"
          type="text"
          onChange={(e) => setInput(e.target.value)}
          value={input}
          placeholder="Search threads"
        />
      </div>
      <div>
        <Label>Category</Label>
        <Select
          value={catSlug}
          onValueChange={(e) => {
            setCatSlug(e);
          }}
        >
          <SelectTrigger className="w-[200px]">
            <SelectValue placeholder="Select a Category" />
          </SelectTrigger>
          <SelectContent>
            {category.map((c) => (
              <SelectItem key={c.slug} value={c.slug}>
                {c.title}
              </SelectItem>
            ))}
            <Button
              className="w-full px-2"
              variant="secondary"
              size="sm"
              onClick={() => {
                setCatSlug("");
              }}
            >
              Clear
            </Button>
          </SelectContent>
        </Select>
      </div>
      {(role === "ADMIN" || role === "MODERATOR") && (
        <div>
          <Label>Writer</Label>
          <Select
            value={userId}
            onValueChange={(e) => {
              setUserId(e);
            }}
          >
            <SelectTrigger className="w-[150px]">
              <SelectValue placeholder="Select a writer" />
            </SelectTrigger>
            <SelectContent>
              {writers &&
                writers.map((w) => (
                  <SelectItem key={w.id} value={w.id}>
                    <Avatar className="mr-2 inline-block size-5">
                      <AvatarImage src={w.image || ""} />
                      <AvatarFallback>HB</AvatarFallback>
                    </Avatar>
                    {w.name}
                  </SelectItem>
                ))}
              <Button
                className="w-full px-2"
                variant="secondary"
                size="sm"
                onClick={() => setUserId("")}
              >
                Clear
              </Button>
            </SelectContent>
          </Select>
        </div>
      )}
    </div>
  );
};

export default FilterThreads;
