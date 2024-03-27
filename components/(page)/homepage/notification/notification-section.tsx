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
import { usePathname, useRouter, useSearchParams } from "next/navigation";

const NotificationSection = () => {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();

  const [notificationId, setNotificationId] = useState<string>("");
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const id = searchParams.get("notificationId");
    if (!id) return;
    setNotificationId(id);
    setOpen(true);
  }, [searchParams]);

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
          <NotificationList notificationId={notificationId} handleOpenNotification={handleOpenNotification}/>
        </CardContent>
      </Card>
    </Dialog>
  );
};

export default NotificationSection;
