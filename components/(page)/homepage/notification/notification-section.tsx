"use client";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import NotificationList from "./notification-list";
import { Dialog } from "@/components/ui/dialog";
import { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { Notification } from "@/type";

const NotificationSection = ({ data, found, notificationId }: { data: Notification[], found: Notification | undefined, notificationId: string }) => {
  const pathname = usePathname();
  const router = useRouter();

  const [open, setOpen] = useState(false);

  const handleOpenNotification = () => {
    if (open) router.replace(pathname);
    setOpen(!open);
  };

  return (
    <Dialog open={open} onOpenChange={handleOpenNotification}>
      <Card className="flex-1 bg-background">
        <CardHeader className="flex flex-row items-center justify-between px-4 pb-0">
          <div className="">
            <CardTitle>Notifications</CardTitle>
            <CardDescription>Latest Notifications</CardDescription>
          </div>
          <Button variant={"outline"}>See more</Button>
        </CardHeader>
        <CardContent className="p-3">
          <NotificationList
            data={data}
            found={found}
            handleOpenNotification={handleOpenNotification}
          />
        </CardContent>
      </Card>
    </Dialog>
  );
};

export default NotificationSection;
