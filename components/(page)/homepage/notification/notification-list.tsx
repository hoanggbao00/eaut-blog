"use client";
import {
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import NotificationItem from "./notification-item";
import { Notification } from "@/type";
import { formatContent, formatDate } from "@/lib/utils";
import { useMemo } from "react";

// const notificationData = [
//   {
//     id: "1",
//     title: "Hello World 1",
//     content: "Hello World 1",
//     startDate: "2021-01-01",
//     endDate: "2022-04-01",
//     isExpired: false,
//     isStarted: true,
//     createdAt: "2021-01-01",
//     userEmail: "kaitou.kurosaki@gmail.com",
//   },
//   {
//     id: "2",
//     title: "Hello World 2",
//     content: "Hello World 2",
//     startDate: "2021-01-01",
//     endDate: "2022-02-01",
//     isExpired: true,
//     isStarted: true,
//     createdAt: "2021-01-01",
//     userEmail: "kaitou.kurosaki@gmail.com",
//   },
//   {
//     id: "3",
//     title: "Hello World 3",
//     content: "Hello World 3",
//     startDate: "2021-04-01",
//     endDate: "2022-05-01",
//     isExpired: false,
//     isStarted: false,
//     createdAt: "2021-01-01",
//     userEmail: "kaitou.kurosaki@gmail.com",
//   },
//   {
//     id: "4",
//     title: "Hello World 4",
//     content: "Hello World 4",
//     startDate: "2021-02-01",
//     endDate: "2022-04-01",
//     isExpired: false,
//     isStarted: true,
//     createdAt: "2021-01-01",
//     userEmail: "kaitou.kurosaki@gmail.com",
//   },
//   {
//     id: "5",
//     title: "Hello World 5",
//     content: "Hello World 5",
//     startDate: "2021-03-01",
//     endDate: "2022-04-01",
//     isExpired: false,
//     isStarted: true,
//     createdAt: "2021-01-01",
//     userEmail: "kaitou.kurosaki@gmail.com",
//   },
//   {
//     id: "6",
//     title: "Hello World 6",
//     content: "Hello World 6",
//     startDate: "2021-03-01",
//     endDate: "2022-04-01",
//     isExpired: false,
//     isStarted: true,
//     createdAt: "2021-01-01",
//     userEmail: "kaitou.kurosaki@gmail.com",
//   },
// ];

const NotificationList = ({
  data,
  found,
  handleOpenNotification,
}: {
  data: Notification[];
  found: Notification | undefined;
  handleOpenNotification: any;
}) => {
  const content = useMemo(
    () => (found ? formatContent(found.content) : ""),
    [found],
  );
  return (
    data && (
      <>
        <div className="flex flex-1 flex-col gap-0">
          {data.map((item) => (
            <NotificationItem
              key={item.id}
              data={item}
              handleOpenNotification={handleOpenNotification}
            />
          ))}
        </div>
        {found && (
          <DialogContent>
            <DialogHeader>
              {found.isModified && (
                <span className="text-xs text-gray-400">(Modified)</span>
              )}
              <DialogTitle className="text-xl">{found.title}</DialogTitle>
              <DialogDescription className="border-b-2 pb-1">
                <p className="">
                  <span>Start from: </span>
                  <b>{formatDate(found.startFrom.toString())}</b>
                </p>
                {found.endTo && (
                  <p className="text-xs text-red-400">
                    <span>Expired in: </span>{" "}
                    <b>{formatDate(found.endTo.toString())}</b>
                  </p>
                )}
                <span className="text-xs">by {found.userEmail}</span>
              </DialogDescription>
            </DialogHeader>
            <div
              className="prose max-h-[60dvh] w-full overflow-auto dark:prose-invert"
              dangerouslySetInnerHTML={{ __html: content }}
            ></div>
          </DialogContent>
        )}
      </>
    )
  );
};

export default NotificationList;
