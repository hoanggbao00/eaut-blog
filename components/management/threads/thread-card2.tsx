"use client";
import { Thread } from "@/type";
import Image from "next/image";
import { formatDate } from "@/lib/utils";
import { useRouter, useSearchParams } from "next/navigation";
import { DialogTrigger } from "@/components/ui/dialog";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import Author from "@/components/shared/author";
import CategoryTag from "@/components/shared/category-tag";

const ThreadCard2 = ({
  thread,
}: {
  thread: Thread;
}) => {
  const { slug } = thread;
  const router = useRouter();
  const params = useSearchParams()

  const handleClick = () => {
    const page = params.get('page') || 1
    router.replace(`?slug=${slug}&page=${page}`,);
  };

  return (
    <DialogTrigger asChild>
      <Card className="flex">
        <CardContent
          className="flex w-full flex-col gap-2 p-3"
          onClick={handleClick}
        >
          <CategoryTag data={thread.cat} className="w-fit"/>
          <div className="relative aspect-video overflow-hidden rounded-lg shadow-md">
            <Image
              src={
                thread.thumbnail
                  ? thread.thumbnail
                  : "https://images.pexels.com/photos/18022560/pexels-photo-18022560/free-photo-of-thien-nhien-thu-v-t-d-ng-v-t-con-v-t.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
              }
              fill
              alt="img"
              className="object-cover transition-transform hover:scale-105"
            />
          </div>
          <div className="">
            <h2 className="line-clamp-2 text-xl font-bold">{thread.title}</h2>
            <div className="mt-2 flex gap-x-5">
              <p>4.5 Rate</p>
              <p>4.5 Rate</p>
            </div>
          </div>
          <Separator />
          <div className="flex items-center gap-2">
            <span className="text-xs text-gray-500">Published by</span>
            <Author user={thread.user} />
            <span className="text-xs text-gray-500">
              {/* at {formatDate(thread.createdAt)} */}
            </span>
          </div>
        </CardContent>
      </Card>
    </DialogTrigger>
  );
};

export default ThreadCard2;
