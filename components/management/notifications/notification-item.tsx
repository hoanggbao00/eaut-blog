"use client";
import { DialogTrigger } from "@/components/ui/dialog";
import { Separator } from "@/components/ui/separator";
import { formatDate } from "@/lib/utils";
import { Notification } from "@/type";
import { useRouter } from "next/navigation";
import { twMerge } from "tailwind-merge";

const NotificationItem = ({
  data,
  type,
}: {
  data: Notification;
  type: "waiting" | "ongoing" | "expired";
}) => {
  const router = useRouter();
  const color = {
    waiting: "border-yellow-500 bg-yellow-300/50",
    ongoing: "border-green-500 bg-green-300/50",
    expired: "border-red-500 bg-red-300/50",
  };

  const handleOpen = () => {
    window.localStorage.setItem("notification__content", data.content);
    router.replace(`?id=${data.id}`, { scroll: false });
  };

  return (
    <DialogTrigger
      className={twMerge(
        `cursor-pointer rounded-lg border-2 p-1 text-left`,
        color[type],
      )}
      onClick={handleOpen}
    >
      <h3 className="line-clamp-3 text-ellipsis uppercase">{data.title}</h3>
      <Separator className={`my-2 bg-black`} />
      <div className="mt-1 text-sm">
        <p className="inline-block">
          by <b>{data.user.name}</b>,
        </p>
        <span>
          {" "}
          from <b>{formatDate(data.startFrom.toString(), true)}</b>
        </span>
        {data.endTo && (
          <p>
            Expired in:{" "}
            <span className="font-semibold text-red-500">
              {formatDate(data.endTo.toString(), true)}
            </span>
          </p>
        )}
      </div>
    </DialogTrigger>
  );
};

export default NotificationItem;
