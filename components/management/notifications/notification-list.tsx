"use client";
import Title from "@/components/ui/title";
import { Notification } from "@/type";
import NotificationItem from "./notification-item";
import { Dialog } from "@/components/ui/dialog";
import { useRouter } from "next/navigation";
import NotificationView from "./notification-view";
import { useState } from "react";
import { CompareDate, getISOLocalString } from "@/lib/utils";

const NotificationList = ({
  data,
  id,
  found,
}: {
  data: Notification[];
  id?: string;
  found: Notification | undefined;
}) => {
  const [open, setOpen] = useState(!!id);
  const router = useRouter();
  const handleOpenChange = () => {
    if (id) router.replace("?");
    setOpen(!open);
  };

  const waitingData = data.filter(
    (item) => !CompareDate(new Date(item.startFrom), getISOLocalString()),
  );
  const onGoingData = data.filter(
    (item) =>
      CompareDate(new Date(item.startFrom), getISOLocalString()) &&
      !(item.endTo && CompareDate(new Date(item.endTo), getISOLocalString())),
  );
  const expiredData = data.filter(
    (item) =>
      item.endTo && CompareDate(new Date(item.endTo), getISOLocalString()),
  );

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <div className="flex gap-3">
        <div className="flex-1">
          <div className="flex items-center justify-between">
            <Title>Waiting</Title>
            <span>({waitingData.length})</span>
          </div>
          <div className="mt-1 flex max-h-[78dvh] flex-col gap-2 overflow-y-auto p-2 pl-0">
            {waitingData.map((item) => (
              <NotificationItem key={item.id} data={item} type="waiting" />
            ))}
          </div>
        </div>
        <div className="flex-1">
          <div className="flex items-center justify-between">
            <Title>On going</Title>
            <span>({onGoingData.length})</span>
          </div>
          <div className="mt-1 flex max-h-[78dvh] flex-col gap-2 overflow-y-auto p-2 pl-0">
            {onGoingData.map((item) => (
              <NotificationItem key={item.id} data={item} type="ongoing" />
            ))}
          </div>
        </div>
        <div className="flex-1">
          <div className="flex items-center justify-between">
            <Title>Expired</Title>
            <span>({expiredData.length})</span>
          </div>
          <div className="mt-1 flex max-h-[78dvh] flex-col gap-2 overflow-y-auto p-2 pl-0">
            {expiredData.map((item) => (
              <NotificationItem key={item.id} data={item} type="expired" />
            ))}
          </div>
        </div>
      </div>
      {id && found && <NotificationView data={found} setOpen={setOpen} />}
    </Dialog>
  );
};

export default NotificationList;
