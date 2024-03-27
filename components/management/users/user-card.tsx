"use client";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent } from "@/components/ui/card";
import { AllUser } from "@/type";
import { File } from "lucide-react";
import RoleTag from "./role-tag";
import { Button } from "@/components/ui/button";
import { useSession } from "next-auth/react";

const UserCard = ({ data }: { data: AllUser }) => {
  const session = useSession();
  const user: any = session?.data?.user;

  const handleDelete = async () => {
    //TODO: DELETE Logic here

    alert("TEST MESSAGE: User deleted");
    return data;
  };

  const handleEditRole = async () => {
    //TODO: EDIT Role Logic here
    alert("TEST MESSAGE: Role changed");
  };

  return (
    <Card>
      <CardContent className="p-2">
        
      </CardContent>
    </Card>
  );
};

export default UserCard;
