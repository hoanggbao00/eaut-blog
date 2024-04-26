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
import { NextResponse } from "next/server";
import Image from "next/image";
import { useSession } from "next-auth/react";
import { compressImage, uploadImage } from "@/lib/utils";

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
    const res = await fetch(`/api/thread`, {
      method: "POST",
      body: JSON.stringify(thread),
    });
    const data = await res.json();
    if (res.statusText === "DUPLICATED")
      return alert(`Đã tồn tại bài viết có slug là ${thread.slug}`);
    if (res.status === 404) return alert("Failed to create thread");

    return data;
  };

  const handleEdit = async (thread: any) => {
    const res = await fetch(`/api/thread/${metaData.slug}`, {
      method: "PUT",
      body: JSON.stringify(thread),
    });
    const data = await res.json();
    if (!res) alert("failed to edit thread");
    return data;
  };

  // Handle publish button
  const handlePublish = async () => {
    // TODO: Validate form first
    const content = window.localStorage.getItem("novel__content");

    if (!content || !metaData) return;

    let thread = {
      slug: metaData.slug,
      title: metaData.title,
      catSlug: metaData.catSlug,
      content: content,
      thumbnail: metaData.thumbnail,
      userEmail: user?.email,
    };

    if (!thread.slug || !thread.title || !thread.catSlug || !thread.userEmail)
      return alert("Thiếu một trong các ô nội dung");

    //* check thumbnail first
    setIsActionLoading(true);
    setIsThumbnailLoading(true);
    const check = await checkThumbnail();

    if (check && media) {
      const resizedImage = await compressImage(media, {quality: 0.8, type: "image/jpeg"})
      const res = await uploadImage(resizedImage);

      if (res) thread = { ...thread, thumbnail: res };
    }
    setIsThumbnailLoading(false);
    //* Done check thumbnail

    //* handle type editor
    if (type === "edit") {
      const res = await handleEdit(thread);
      if (!res) return;
    }

    if (!type || type === "add") {
      const res = await handleAdd(thread);
      if (!res) return;
    }

    //* redirect
    const redirectCheck = confirm(
      `${type === "edit" ? "Sửa" : "Thêm"} thành công!\nBạn có muốn bay tới trang \`Quản lý Threads\` không?`,
    );
    setIsActionLoading(false);
    if (redirectCheck) {
      handleReset();
      router.push("/management/threads");
    } else {
      handleReset();
      router.replace("/management/editor");
    }
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
