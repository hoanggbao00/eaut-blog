"use client";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DialogContent,
  DialogFooter,
  DialogHeader,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { AllUser, Role } from "@/type";
import { useState } from "react";
import RoleTag from "./role-tag";
import { Button } from "@/components/ui/button";
import { DialogClose } from "@radix-ui/react-dialog";
import { LoaderIcon, RotateCcw, X } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const UserDialog = ({
  data,
  userSession,
}: {
  data: AllUser;
  userSession: any;
}) => {
  const [name, setName] = useState(data.name);
  const [role, setRole] = useState(data.role);
  const [isAction, setIsAction] = useState(false);

  const handleSave = async () => {
    if (!name) return alert("Tên trống !!");
    setIsAction(true);
    const newData = {
      name: name,
      role: role,
    };

    const res = await fetch(`/api/user/${data.id}`, {
      method: "PUT",
      body: JSON.stringify(newData),
    });

    setIsAction(false);
    if (res.status === 200) {
      return alert("Hoàn thành");
    }
    alert("Lỗi");
  };

  return (
    <DialogContent>
      <DialogHeader>
        <div className="flex flex-col items-center justify-center border-b-2 border-border pb-3">
          <RoleTag role={data.role} className="text-md" />
          <div className="my-3 aspect-square h-[128px]">
            <Avatar className="h-full w-full">
              <AvatarImage
                src={data.image}
                className="h-full w-full rounded-full object-cover"
              />
              <AvatarFallback>HB</AvatarFallback>
            </Avatar>
          </div>
          <h2 className="text-2xl font-semibold text-primary">{data.name}</h2>
          <p className="text-lg text-gray-500">{data.email}</p>
        </div>
      </DialogHeader>
      <div className="relative w-full">
        <Label>Tên/ Name:</Label>
        <Input
          id="name"
          name="name"
          type="text"
          placeholder={data.name}
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="pr-15"
        />
        <div className="absolute right-[1%] top-[38%] space-x-1">
          {(!name || name !== data.name) && (
            <Button
              variant="ghost"
              className="p-0"
              onClick={() => setName(data.name)}
            >
              <RotateCcw size={20} />
            </Button>
          )}
          {name && (
            <Button variant="ghost" className="p-0" onClick={() => setName("")}>
              <X size={20} />
            </Button>
          )}
        </div>
      </div>
      {userSession &&
        (userSession.role === "MODERATOR" || userSession.role === "ADMIN") &&
        data.role !== "ADMIN" && (
          <div>
            <p>Vai trò/ Role:</p>
            <Select onValueChange={(value: Role) => setRole(value)}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Vai trò" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="NONE">
                  <RoleTag role="NONE" />
                </SelectItem>
                <SelectItem value="USER">
                  <RoleTag role="USER" />
                </SelectItem>
                <SelectItem value="WRITER">
                  <RoleTag role="WRITER" />
                </SelectItem>
                <SelectItem value="MODERATOR">
                  <RoleTag role="MODERATOR" />
                </SelectItem>
                {userSession.role === "ADMIN" && (
                  <SelectItem value="ADMIN">
                    <RoleTag role="ADMIN" />
                  </SelectItem>
                )}
              </SelectContent>
            </Select>
          </div>
        )}
      <DialogFooter>
        <div className="flex items-center justify-end gap-3 py-2">
          <DialogClose asChild>
            <Button variant="outline">Đóng</Button>
          </DialogClose>
          {(data.name !== name || data.role !== role) && (
            <Button onClick={handleSave} disabled={isAction}>
              {isAction && <LoaderIcon className="mr-2 animate-spin" />}
              Lưu
            </Button>
          )}
        </div>
      </DialogFooter>
    </DialogContent>
  );
};

export default UserDialog;
