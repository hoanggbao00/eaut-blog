import Title from "@/components/ui/title";
import { Button } from "@/components/ui/button";
import { twMerge } from "tailwind-merge";
import ThreadCard from "@/components/shared/thread-card";
import Link from "next/link";
import { Thread } from "@/type";
import ClientPagination from "./client-pagination";

const RecentThreads = async ({
  className,
  itemOrientation,
  data,
  totalPage,
  currentPage,

}: {
  className?: string;
  itemOrientation?: "horizontal" | "vertical";
  data?: Thread[];
  totalPage: number;
  currentPage: number;
}) => {
  return (
    <section className="flex flex-col gap-2">
      <div className="flex items-center justify-between">
        <Title>Recent Threads</Title>
        <Button variant="outline" asChild>
          <Link href="/blog">All Thread</Link>
        </Button>
      </div>
      <div
        className={twMerge(
          `grid grid-cols-2 gap-0 md:grid-cols-3 md:gap-5`,
          className,
        )}
      >
        {data
          ? data.map((thread) => (
              <ThreadCard
                orientation={itemOrientation}
                thread={thread}
                key={thread.slug}
              />
            ))
          : "There is nothing in this category"}
      </div>
      <ClientPagination totalPage={totalPage} currentPage={currentPage}/>
    </section>
  );
};

export default RecentThreads;
