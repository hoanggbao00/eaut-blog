"use client";

import { Separator } from "@/components/ui/separator";
import { useLocalStorage } from "@/hooks/useLocalStorage";
import { useMemo, useState } from "react";
import { generateHTML } from "@tiptap/html";
import { editorExtension } from "@/lib/default-extension";
import { JSONContent } from "@tiptap/core";
import { DialogClose, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { LoaderCircle } from "lucide-react";
import { BASE_API_URL } from "@/lib/constants";
import { NextResponse } from "next/server";
import Image from "next/image";
import { useSession } from "next-auth/react";

const uploadImage = async (
  file?: File,
  filename?: string,
): Promise<NextResponse> => {
  if (!file)
    return NextResponse.json({ status: 404, message: "no file available" });
  const res = await fetch(`/api/upload?filename=${filename}`, {
    method: "POST",
    headers: {
      "content-type":
        (file == null ? void 0 : file.type) || "application/octet-stream",
      "x-vercel-filename": (file == null ? void 0 : file.name) || "image.png",
    },
    body: file,
  });

  return res.json();
};

const EditorPreview = ({
  type,
  metaData,
  handleReset,
  media,
}: {
  type: "edit" | "add";
  metaData: any;
  handleReset: () => void;
  media: File | undefined;
}) => {
  const session = useSession();
  const user = session?.data?.user;
  const [content] = useLocalStorage<JSONContent>("novel__content", {});
  const router = useRouter();
  const [isThumbnailLoading, setIsThumbnailLoading] = useState<boolean>(false);
  const [isActionLoading, setIsActionLoading] = useState<boolean>(false);

  const output = useMemo(() => {
    if (!content?.content) return "<p>Nothing to do here</p>";
    return generateHTML(content, editorExtension);
  }, [content]);

  const checkThumbnail = async () => {
    const oldThumbnailUrl = (await JSON.parse(
      window.localStorage.getItem("old_thumbnail") as string,
    )) || { src: "" };
    if (metaData.thumbnail === oldThumbnailUrl.src) return false;
    if (!media) return false;

    return true;
  };

  // Add new thread
  const handleAdd = async (thread: any) => {
    setIsActionLoading(true);

    // check thumbnail first
    let _thread = { ...thread };

    const check = await checkThumbnail();
    if (check) {
      setIsThumbnailLoading(true);
      const res = await uploadImage(media);
      if (res.status === 404) {
        alert("failed to upload image");
      }

      if (res.status === 200) _thread = { ...thread, thumbnail: res.url };
    }
    setIsThumbnailLoading(false);

    const res = await fetch(`${BASE_API_URL}/api/thread`, {
      method: "POST",
      body: JSON.stringify(_thread),
    });
    const data = await res.json();
    if (res.statusText === "DUPLICATED")
      return alert(`Đã tồn tại bài viết có slug là ${thread.slug}`);
    if (res.status === 404) return alert("Failed to create thread");

    setIsActionLoading(false);
    alert("Successful add thread");
    return data;
  };

  //TODO: Edit thread
  const handleEdit = async (thread: any) => {
    return alert("comming soon");
    const data = await fetch(`${BASE_API_URL}/api/thread/${metaData.id}`, {
      method: "PUT",
      body: JSON.stringify(thread),
    });
    const res = await data.json();
    if (!res) alert("failed to edit thread");
    alert("Edit successfully");

    return data;
  };

  // Handle publish button
  const handlePublish = async () => {
    // TODO: Validate form first
    const content = window.localStorage.getItem("novel__content");

    if (!content || !metaData) return;

    const thread = {
      slug: metaData.slug,
      title: metaData.title,
      catSlug: metaData.catSlug,
      content: content,
      thumbnail: metaData.thumbnail,
      userEmail: user?.email,
    };

    if (!thread.slug || !thread.title || !thread.catSlug || !thread.userEmail)
      return alert("Thiếu một trong các ô nội dung");

    // type = edit
    if (type === "edit") {
      const res = handleEdit(thread);
      if (!res) return;
    }

    // type = new
    if (!type || type === "add") {
      const res = handleAdd(thread);
      if (!res) return;
    }

    handleReset();
  };

  return metaData ? (
    <>
      <div className="">
        <div className="space-y-2">
          {metaData.catSlug && <p>Category: {metaData.catSlug}</p>}
          <h1 className="text-xl font-bold">
            {metaData.title ? metaData.title : "Title goes here"}
          </h1>
          <span className="text-sm text-neutral-400">
            ({metaData.slug ? metaData.slug : "slug-goes-here"})
          </span>
        </div>
        {metaData.thumbnail && (
          <div className="relative mx-auto mt-2 aspect-video h-[200px]">
            <Image
              src={metaData.thumbnail}
              fill
              className="object-cover"
              alt="preview"
            />
          </div>
        )}
        <Separator className="my-4" />
        {content ? (
          <div
            className="prose max-w-full dark:prose-invert"
            dangerouslySetInnerHTML={{ __html: output }}
          ></div>
        ) : (
          "Content will show here..."
        )}
      </div>
      <DialogFooter>
        <DialogClose asChild>
          <Button variant="outline">Close</Button>
        </DialogClose>
        <Button
          onClick={handlePublish}
          disabled={isActionLoading || isThumbnailLoading}
        >
          {isActionLoading && <LoaderCircle className="mr-2 animate-spin" />}
          {isThumbnailLoading
            ? "Uploading Thumbnail..."
            : isActionLoading
              ? "Uploading Thread..."
              : "Publish"}
        </Button>
      </DialogFooter>
    </>
  ) : null;
};

export default EditorPreview;
