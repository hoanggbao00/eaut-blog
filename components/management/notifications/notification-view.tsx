"use client";
import { Button } from "@/components/ui/button";
import {
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Separator } from "@/components/ui/separator";
import { formatContent, formatDate } from "@/lib/utils";
import { Notification } from "@/type";
import { useRouter } from "next/navigation";
import { useMemo, useState } from "react";
import TextEditor from "../editor/text-editor";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { DateTimePicker } from "@/components/ui/date-timepicker";
import { RotateCcw, X } from "lucide-react";

const NotificationView = ({
  data,
  edit,
  id,
  setOpen,
}: {
  data: Notification;
  id?: string;
  edit: boolean;
  setOpen: (e: boolean) => void;
}) => {
  const [title, setTitle] = useState(data.title);
  const [startDate, setStartDate] = useState<Date | undefined>(
    new Date(data.startFrom),
  );
  const [endDate, setEndDate] = useState<Date | undefined>(
    data.endTo && new Date(data.endTo),
  );

  const router = useRouter();
  const content = useMemo(() => {
    return formatContent(data.content);
  }, [data]);

  const handleEdit = async () => {
    if (!edit && id) return router.replace(`?id=${id}&edit=true`);

    const editedContent = window.localStorage.getItem("notification__content");
    const body = {
      ...(title !== data.title && title && { title: title }),
      ...(startDate && { startFrom: startDate }),
      ...(endDate && { endTo: endDate }),
      ...(editedContent !== data.content && { content: editedContent }),
    };

    const res = await fetch(`/api/notification/${data.id}`, {
      method: "PUT",
      body: JSON.stringify(body),
    })
    if(res.status !== 200) return alert('Something went wrong')
    alert('Edited Sucessfully')

    setOpen(false);
    router.replace(`?`);
  };

  return (
    <DialogContent>
      <DialogHeader>
        <DialogTitle asChild>
          <div className="mt-2">
            {!edit ? (
              <h2>{data.title}</h2>
            ) : (
              <div className="relative flex items-center gap-2">
                <Label htmlFor="title" className="w-[20%] text-nowrap">
                  Tiêu đề
                </Label>
                <Input
                  id="title"
                  type="text"
                  name="title"
                  value={title}
                  placeholder={data.title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="pr-7"
                />
                {!title ? (
                  <RotateCcw
                    className="absolute right-1 top-3 hover:text-primary"
                    size={18}
                    onClick={() => setTitle(data.title)}
                  />
                ) : (
                  <X
                    className="absolute right-1 top-3 hover:text-primary"
                    size={18}
                    onClick={() => setTitle("")}
                  />
                )}
              </div>
            )}
          </div>
        </DialogTitle>
        <DialogDescription>
          {edit && (
            <>
              <div className="flex items-center gap-2">
                <Label htmlFor="title" className="w-[16%] text-nowrap">
                  Bắt đầu
                </Label>
                <DateTimePicker
                  jsDate={startDate}
                  onJsDateChange={setStartDate}
                  granularity="minute"
                />
              </div>
              <div className="my-2 flex items-center gap-2">
                <Label htmlFor="title" className="w-[16%] text-nowrap">
                  Kết thúc
                </Label>
                <DateTimePicker
                  jsDate={endDate}
                  onJsDateChange={setEndDate}
                  granularity="minute"
                />
              </div>
            </>
          )}
          <span>
            by <b>{data.userEmail}</b>
          </span>
          {!edit && (
            <>
              <span className="ml-2">
                from <b>{formatDate(data.startFrom.toString(), true)}</b>
              </span>
              {data.endTo && (
                <span className="block">
                  Expired in:{" "}
                  <span className="font-semibold text-red-500">
                    {formatDate(data.endTo.toString(), true)}
                  </span>
                </span>
              )}
            </>
          )}
        </DialogDescription>
      </DialogHeader>
      <Separator className="my-2" />
      {!edit ? (
        <div
          className="prose max-h-[60dvh] overflow-auto dark:prose-invert"
          dangerouslySetInnerHTML={{ __html: content }}
        ></div>
      ) : (
        <div className="prose max-h-[60dvh] overflow-auto dark:prose-invert">
          <TextEditor storageKey="notification__content" />
        </div>
      )}
      <DialogFooter>
        <Button onClick={handleEdit}>{edit ? "Xác nhận" : "Chỉnh sửa"}</Button>
        <Button variant="destructive">Xóa</Button>
      </DialogFooter>
    </DialogContent>
  );
};

export default NotificationView;
