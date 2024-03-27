"use client";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";
import { CommentVote as VoteType } from "@/type";
import { ArrowBigDown, ArrowBigUp } from "lucide-react";
import { useSession } from "next-auth/react";

const CommentVote = ({
  commentId,
  voteData,
  mutate,
}: {
  commentId: string;
  voteData: VoteType[];
  mutate: () => void;
}) => {
  const session = useSession();

  const upVote = voteData.filter((v) => v.type === "UPVOTE");
  const downVote = voteData.filter((v) => v.type === "DOWNVOTE");
  const foundVote = voteData.find(
    (c) => c.userEmail === session?.data?.user?.email,
  );

  const handleVote = async (type: "UPVOTE" | "DOWNVOTE") => {
    if (!session.data) return;

    const res = await fetch(`/api/comment/${commentId}?type=${type}`, {
      method: "PUT",
      body: JSON.stringify(session.data.user?.email),
    });
    mutate();
  };

  return (
    <TooltipProvider>
      <div className="absolute -bottom-3 right-0 flex items-center justify-center gap-x-2">
        <Tooltip>
          <TooltipTrigger asChild>
            <button
              onClick={() => handleVote("UPVOTE")}
              className={cn("text-gray-500 hover:text-primary", {
                "text-primary": foundVote?.type === "UPVOTE",
              })}
            >
              <ArrowBigUp size={28} />
            </button>
          </TooltipTrigger>
          <TooltipContent>
            <p
              dangerouslySetInnerHTML={{
                __html:
                  upVote.length !== 0
                    ? upVote.length > 2
                      ? `<b>${upVote[0].user.name}</b> và <b>${upVote.length - 1}</b> người khác đã vote nội dung này`
                      : upVote.length === 2
                        ? `<b>${upVote[0].user.name}</b> và <b>${upVote[1].user.name}</b> đã vote nội dung này`
                        : `<b>${upVote[0].user.name}</b> đã vote nội dung này`
                    : "Up vote nội dung này",
              }}
            ></p>
          </TooltipContent>
        </Tooltip>
        <Tooltip>
          <TooltipTrigger asChild>
            <button
              onClick={() => handleVote("DOWNVOTE")}
              className={cn("text-gray-500 hover:text-primary", {
                "text-primary": foundVote?.type === "DOWNVOTE",
              })}
            >
              <ArrowBigDown size={28} />
            </button>
          </TooltipTrigger>
          <TooltipContent>
            <p
              dangerouslySetInnerHTML={{
                __html:
                  downVote.length !== 0
                    ? downVote.length > 2
                      ? `<b>${downVote[0].user.name}</b> và <b>${downVote.length - 1}</b> người khác đã vote nội dung này`
                      : downVote.length === 2
                        ? `<b>${downVote[0].user.name}</b> và <b>${downVote[1].user.name}</b> đã vote nội dung này`
                        : `<b>${downVote[0].user.name}</b> đã vote nội dung này`
                    : "Up vote nội dung này",
              }}
            ></p>
          </TooltipContent>
        </Tooltip>
      </div>
    </TooltipProvider>
  );
};

export default CommentVote;
