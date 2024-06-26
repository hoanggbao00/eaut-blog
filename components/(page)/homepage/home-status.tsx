"use client";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { User } from "@/type";
import { useSession } from "next-auth/react";
import Link from "next/link";

const HomeStatus = () => {
  const session = useSession();
  const user = session?.data?.user as User;

  return (
    user && (
      <Card className="bg-background">
        <CardContent className="flex flex-row items-center justify-between p-3">
          <div className="flex items-center gap-3">
            <Avatar className="h-[32px] w-[32px]">
              <AvatarImage src={user?.image || ""} />
              <AvatarFallback>HB</AvatarFallback>
            </Avatar>
            <p>
              Hi <b>{user.name}</b>, How{"'"}s your day?
            </p>
          </div>
          {user && user.role !== "USER" && (
            <div className="flex flex-col gap-1 md:flex-row">
              {user.role !== "WRITER" && (
                <Link href="/management">
                  <Button variant="outline">Management</Button>
                </Link>
              )}
              <Link href="/management/editor?type=new">
                <Button>New Post</Button>
              </Link>
            </div>
          )}
        </CardContent>
      </Card>
    )
  );
};

export default HomeStatus;
