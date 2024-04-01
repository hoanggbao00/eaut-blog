"use client";

import { DialogTrigger } from "@/components/ui/dialog";
import { useRouter } from "next/navigation";
import { Notification } from "@/type";
import { formatDate } from "@/lib/utils";

const NotificationItem = ({
  data,
  handleOpenNotification,
}: {
  data: Notification;
  handleOpenNotification: any;
}) => {
  const router = useRouter();

  const handleOpen = () => {
    router.replace(`?notificationId=${data.id}`, { scroll: false });
    handleOpenNotification();
  };

  return (
    <DialogTrigger asChild>
      <div
        className="flex flex-1 cursor-pointer gap-3 rounded-lg p-3 hover:bg-neutral-400/20"
        onClick={handleOpen}
      >
        <div className="flex flex-[3] flex-col justify-between gap-1">
          <h1 className="line-clamp-2 font-semibold">{data.title}</h1>
          <div className="flex items-center justify-between text-xs">
            <span>
              From: <b>{formatDate(data.startFrom.toString(), false)}</b>
            </span>
            {data.endTo && (
              <span>
                Expired in: <b>{formatDate(data.endTo.toString(), false)}</b>
              </span>
            )}
          </div>
        </div>
      </div>
    </DialogTrigger>
  );
};

export default NotificationItem;
