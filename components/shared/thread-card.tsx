import Image from "next/image";
import Link from "next/link";
import { cn, formatContent, formatDate, formatDescription } from "@/lib/utils";
import Author from "./author";
import { Thread } from "@/type";
import CategoryTag from "./category-tag";
import Title from "../ui/title";

const ThreadCard = ({
  orientation = "vertical",
  thread,
}: {
  orientation?: "horizontal" | "vertical";
  thread: Thread;
}) => {
  const html = formatContent(thread.content);

  return (
    thread && (
      <div
        className={cn(
          "flex flex-col gap-3 rounded-lg p-3 hover:bg-neutral-400/30 md:p-5",
          {
            "flex-row": orientation === "horizontal",
          },
        )}
      >
        <Link
          href={`/thread/${thread.slug}`}
          className={cn(`relative aspect-[4/3] overflow-hidden rounded-lg hidden sm:block`, {
            "aspect-video flex-1": orientation === "horizontal",
          })}
        >
          <Image
            src={
              thread.thumbnail
                ? thread.thumbnail
                : "https://images.pexels.com/photos/18022560/pexels-photo-18022560/free-photo-of-thien-nhien-thu-v-t-d-ng-v-t-con-v-t.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
            }
            alt="image"
            fill
            className="object-cover transition-transform hover:scale-110"
          />
        </Link>
        <div
          className={cn("flex flex-col gap-2", {
            "flex-[4]": orientation === "horizontal",
          })}
        >
          <div>
            <CategoryTag data={thread.cat} />
          </div>
          <Link href={`/thread/${thread.slug}`}>
            <Title className="text-md line-clamp-3 hover:underline sm:text-lg md:text-xl lg:text-2xl">
              {thread.title}
            </Title>
          </Link>
          <div className="line-clamp-3 text-sm">
            {thread.desc ? thread.desc : formatDescription(html, 128)}
          </div>
          <p className="text-sm font-light text-gray-500">
            {formatDate(thread.createdAt)}
          </p>
          <Author user={thread.user} />
        </div>
      </div>
    )
  );
};

export default ThreadCard;
