"use client";
import { cn } from "@/lib/utils";
import { ThreadVote as VoteType } from "@/type";
import { ArrowBigDown, ArrowBigUp, MessageCircle } from "lucide-react";
import { useSession } from "next-auth/react";
import Link from "next/link";
import useSWR from "swr";

const fetcher = async (url: string) => {
  const res = await fetch(url);
  const data = await res.json();

  if (!res.ok) throw new Error("Error fetching");
  return data;
};

const ThreadVote = ({
  commentCount,
  slug,
}: {
  commentCount: number;
  slug: string;
}) => {
  const { data, mutate, isLoading } = useSWR<{
    data: VoteType[];
    count: { UPVOTE: number; DOWNVOTE: number };
  }>(`/api/thread-vote?threadSlug=${slug}`, fetcher);

  const session = useSession();

  const foundVote = data?.data.find(
    (c) => c.userEmail === session?.data?.user?.email,
  );

  const handleVote = async (type: "UPVOTE" | "DOWNVOTE") => {
    if (!session.data) return;

    const res = await fetch(`/api/thread/${slug}?type=${type}`, {
      method: "PUT",
      body: JSON.stringify(session.data.user?.email),
    });
    mutate();
  };

  return (
    !isLoading && (
      <div className="flex border-y-2 border-border bg-foreground/5 text-foreground/50">
        <button
          className={cn(
            "flex flex-1 flex-col items-center justify-center gap-2 py-3 hover:bg-foreground/20 hover:text-primary md:flex-row",
            { "text-primary": foundVote?.type === "UPVOTE" },
          )}
          onClick={() => handleVote("UPVOTE")}
        >
          <ArrowBigUp size={32} />
          <p>{data?.count.UPVOTE || 0} Upvote</p>
        </button>
        <button
          className={cn(
            "flex flex-1 flex-col items-center justify-center gap-2 py-3 hover:bg-foreground/20 hover:text-primary md:flex-row",
            { "text-primary": foundVote?.type === "DOWNVOTE" },
          )}
          onClick={() => handleVote("DOWNVOTE")}
        >
          <ArrowBigDown size={32} />
          <p>{data?.count.DOWNVOTE || 0} Downvote</p>
        </button>
        <Link
          href={"#comments"}
          className="flex flex-1 flex-col items-center justify-center gap-2 py-3 hover:bg-foreground/20 hover:text-foreground md:flex-row"
        >
          <MessageCircle size={32} />
          <p>{commentCount} phản hồi</p>
        </Link>
      </div>
    )
  );
};

export default ThreadVote;
