"use client";
import { Button } from "@/components/ui/button";
import { DateTimePicker } from "@/components/ui/date-timepicker";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { useSession } from "next-auth/react";
import dynamic from "next/dynamic";
import { useState } from "react";
import TextEditor from "../editor/text-editor";
import { LoaderIcon, X } from "lucide-react";
import { useRouter } from "next/navigation";

const NotificationForm = () => {
  const router = useRouter();
  const session = useSession();
  const user = session?.data?.user;
  const [title, setTitle] = useState("");
  const [startDate, setStartDate] = useState<Date | undefined>(new Date());
  const [endDate, setEndDate] = useState<Date | undefined>();
  const [isLoading, setIsLoading] = useState(false);

  const handleReset = () => {
    setTitle("");
    window.localStorage.removeItem("notification__content");
    const editor = document.querySelector(".tiptap.ProseMirror");
    if (editor) editor.innerHTML = "";
  };

  const handleCreate = async () => {
    const content = window.localStorage.getItem("notification__content");
    if (!title || !startDate || !content) return alert("thieu noi dung");
    setIsLoading(true);

    const data = {
      title: title,
      content: content,
      startFrom: startDate,
      ...(endDate && { endTo: endDate }),
      userEmail: user?.email,
    };

    const res = await fetch("/api/notification", {
      method: "POST",
      body: JSON.stringify(data),
    });
    setIsLoading(false);
    if (res.status !== 200) return alert("Something went wrong");
    alert("Sucessfully created notification");
    router.refresh();
  };

  return (
    <Dialog>
      <div className="">
        <div className="flex justify-end">
          <DialogTrigger asChild>
            <Button className="!bg-primary hover:!bg-primary/50">
              Tạo mới
            </Button>
          </DialogTrigger>
        </div>
        <div></div>
      </div>
      <DialogContent className="min-w-[60dvw]">
        <DialogHeader className="font-semibold">
          Thêm mới thông báo
        </DialogHeader>
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <p className="min-w-[20%]">Tiêu đề:</p>
            <Input
              name="title"
              placeholder="Nhập tiêu đề"
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>
          <div className="flex items-center gap-2">
            <p className="min-w-[20%]">Bắt đầu:</p>
            <DateTimePicker
              granularity="minute"
              hourCycle={24}
              jsDate={startDate}
              onJsDateChange={setStartDate}
            />
          </div>
          <div className="flex items-center gap-2">
            <p className="min-w-[20%]">Kết thúc:</p>
            <div className="relative">
              <DateTimePicker
                granularity="minute"
                hourCycle={24}
                jsDate={endDate}
                onJsDateChange={setEndDate}
              />
            </div>
          </div>
          <div>
            <p>
              by <b>{user?.email}</b>
            </p>
          </div>
        </div>
        <Separator className="my-2" />
        <div className="h-[55dvh] overflow-y-auto">
          <TextEditor storageKey="notification__content" />
        </div>
        <DialogFooter>
          <DialogClose asChild>
            <Button variant="outline">Đóng</Button>
          </DialogClose>
          <Button variant="outline" onClick={handleReset}>
            Reset
          </Button>
          <Button onClick={handleCreate} disabled={isLoading}>
            {isLoading && <LoaderIcon className="mr-2 animate-spin" />}
            Tạo
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

const dynamicNotificationForm = dynamic(
  () => Promise.resolve(NotificationForm),
  {
    ssr: false,
  },
);

export default dynamicNotificationForm;
