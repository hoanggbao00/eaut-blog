"use client";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Title from "@/components/ui/title";
import useSWR from "swr";
import { Button } from "@/components/ui/button";
import CommentItem from "./comment-item";
import { Comment } from "@/type";
import { useState } from "react";
import { useSession } from "next-auth/react";
import { BASE_API_URL } from "@/lib/constants";

const fetcher = async (url: string) => {
  const res = await fetch(url);
  const data = await res.json();

  if (!res.ok) throw new Error("Error fetching");
  return data;
}

const CommentSection = ({ threadSlug }: { threadSlug: string }) => {
  const session = useSession();

  const [comment, setComment] = useState<string>("");
  const { data, mutate, isLoading } = useSWR<Comment[]>(
    `/api/comment?threadSlug=${threadSlug}`,
    fetcher,
  );

  const handleSubmit = async () => {
    if (!comment) return alert("Type some thing pls");

    await fetch(`/api/comment`, {
      method: "POST",
      body: JSON.stringify({
        content: comment,
        threadSlug,
        userEmail: session?.data?.user?.email,
      }),
    });
    mutate();
    setComment("");
  };

  return (
    <section id="comments" className="space-y-3">
      <Title>Comments</Title>
      <div>
        <div className="flex gap-3 pb-5">
          <Avatar>
            <AvatarImage
              src={
                session.data?.user
                  ? session.data.user.image || ""
                  : "https://github.com/shadcn.png"
              }
            />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
          <div className="flex w-full gap-3">
            <textarea
              onChange={(e) => setComment(e.target.value)}
              name="comment"
              id="comment"
              placeholder={
                session.data?.user
                  ? "Let's say something to this article"
                  : "You need Login first"
              }
              className="w-full resize-none border-none bg-transparent p-2 outline-none"
              value={comment}
              disabled={!session?.data?.user}
            />
            <Button onClick={handleSubmit} disabled={!session.data?.user}>
              Send
            </Button>
          </div>
        </div>
        <div className="space-y-5">
          {isLoading
            ? "loading..."
            : data ? data?.map((item) => <CommentItem key={item.id} item={item} mutate={mutate}/>) : 'There is no comment for this thread'}
        </div>
      </div>
    </section>
  );
};

export default CommentSection;
