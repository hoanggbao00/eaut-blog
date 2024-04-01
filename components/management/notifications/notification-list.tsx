"use client";
import Title from "@/components/ui/title";
import { Notification } from "@/type";
import NotificationItem from "./notification-item";
import { Dialog } from "@/components/ui/dialog";
import { useRouter } from "next/navigation";
import NotificationView from "./notification-view";
import { useState } from "react";

const NotificationList = ({
  data,
  id,
  found,
  edit,
}: {
  data: Notification[];
  id?: string;
  found: Notification | undefined;
  edit: boolean;
}) => {
  const [open, setOpen] = useState(!!id);
  const router = useRouter();
  const handleOpenChange = () => {
    if (id) router.replace("?");
    setOpen(!open);
  };

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <div className="flex gap-3">
        <div className="flex-1">
          <div className="flex items-center justify-between">
            <Title>Waiting</Title>
            <span>(3)</span>
          </div>
          <div className="mt-1 flex max-h-[78dvh] flex-col gap-2 overflow-y-auto p-2 pl-0">
            {data
              .filter((item) => item.isStarted === false)
              .map((item) => (
                <NotificationItem key={item.id} data={item} type="waiting" />
              ))}
          </div>
        </div>
        <div className="flex-1">
          <div className="flex items-center justify-between">
            <Title>On going</Title>
            <span>(3)</span>
          </div>
          <div className="mt-1 flex max-h-[78dvh] flex-col gap-2 overflow-y-auto p-2 pl-0">
            {data
              .filter(
                (item) => item.isStarted === true && item.isExpired === false,
              )
              .map((item) => (
                <NotificationItem key={item.id} data={item} type="ongoing" />
              ))}
          </div>
        </div>
        <div className="flex-1">
          <div className="flex items-center justify-between">
            <Title>Expired</Title>
            <span>(3)</span>
          </div>
          <div className="mt-1 flex max-h-[78dvh] flex-col gap-2 overflow-y-auto p-2 pl-0">
            {data
              .filter((item) => item.isExpired === true)
              .map((item) => (
                <NotificationItem key={item.id} data={item} type="expired" />
              ))}
          </div>
        </div>
      </div>
      {id && found && <NotificationView data={found} id={id} edit={edit} setOpen={setOpen}/>}
    </Dialog>
  );
};

export default NotificationList;
