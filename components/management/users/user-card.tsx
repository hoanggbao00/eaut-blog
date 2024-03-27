"use client";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent } from "@/components/ui/card";
import { AllUser } from "@/type";
import { File } from "lucide-react";
import RoleTag from "./role-tag";
import { Button } from "@/components/ui/button";
import { User } from "next-auth";

const UserCard = ({
  data,
  router,
  userSession,
}: {
  data: AllUser;
  router: any;
  userSession: any;
}) => {
  const handleDelete = async () => {
    //TODO: DELETE Logic here

    alert("TEST MESSAGE: User deleted");
    return data;
  };

  const handleOpenDialog = async () => {
    router.replace(`?user=${data.id}`);
  };

  return (
    <Card>
      <CardContent className="p-2">
        <div className="flex flex-col">
          <div className="flex items-center gap-2 border-b-2 border-border pb-2">
            <Avatar className="">
              <AvatarImage
                src={data.image}
                className="h-full w-full rounded-full object-cover"
              />
              <AvatarFallback>HB</AvatarFallback>
            </Avatar>
            <div className="">
              <div className="flex items-center">
                <p className="mr-2 inline-block text-left font-semibold text-primary">
                  {data.name}
                </p>
                <RoleTag role={data.role} />
              </div>
              <p className="text-left text-xs font-light text-gray-500 dark:text-foreground">
                {data.email}
              </p>
            </div>
          </div>
          <div className="mt-2 flex divide-x-2 text-sm text-gray-500 dark:text-foreground">
            <div className="flex flex-1 flex-col items-center">
              <File />
              <p>{data._count.threads} bài viết</p>
            </div>
            <div className="flex flex-1 flex-col items-center">
              <File />
              <p>
                {data._count.commentVotes + data._count.threadVotes} lượt vote
              </p>
            </div>
            <div className="flex flex-1 flex-col items-center">
              <File />
              <p>{data._count.comments} bình luận</p>
            </div>
          </div>
        </div>
        <div className="mt-2 flex items-center justify-end gap-2">
          {userSession &&
            (userSession.role === "MODERATOR" ||
              userSession.role === "ADMIN" ||
              userSession.id === data.id) && (
              <Button variant="outline" onClick={handleOpenDialog}>
                Chỉnh sửa
              </Button>
            )}
          {userSession && userSession.role === "ADMIN" && (
            <Button variant="destructive" onClick={handleDelete}>
              Xóa
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default UserCard;
