"use client";
import { Button } from "@/components/ui/button";
import {
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Thread } from "@/type";
import { formatContent } from "@/lib/utils";
import { useRouter } from "next/navigation";
import { useMemo } from "react";
import { AlertDialogTrigger } from "@/components/ui/alert-dialog";

const ThreadPreview = ({ data }: { data: Thread }) => {
  const { title, slug, catSlug, thumbnail, id } = data;
  const router = useRouter();

  const content = useMemo(() => {
    return formatContent(data.content);
  }, [data.content]);

  const handleEdit = () => {
    window.localStorage.setItem(
      "old_thumbnail",
      JSON.stringify({ src: thumbnail }),
    );

    window.localStorage.setItem(
      "thread_metadata",
      JSON.stringify({
        id,
        title,
        slug,
        catSlug,
        thumbnail,
      }),
    );

    window.localStorage.setItem("novel__content", data.content);

    router.push(`editor?type=edit`);
  };

  return (
    <DialogContent className="max-w-full md:max-w-[60dvw]">
      <DialogHeader className="border-b-2">
        <DialogTitle>{title}</DialogTitle>
        <DialogDescription>({slug})</DialogDescription>
      </DialogHeader>
      <div
        className="prose max-h-[70dvh] max-w-full overflow-auto dark:prose-invert"
        dangerouslySetInnerHTML={{
          __html: content || "<div>nothing too see</div>",
        }}
      ></div>
      <DialogFooter>
        <Button onClick={handleEdit} className=" mt-2 sm:mt-0">Edit</Button>
        <AlertDialogTrigger asChild>
          <Button
            variant={"destructive"}
            className="!bg-destructive hover:!bg-destructive/50"
          >
            Delete
          </Button>
        </AlertDialogTrigger>
      </DialogFooter>
    </DialogContent>
  );
};

export default ThreadPreview;
