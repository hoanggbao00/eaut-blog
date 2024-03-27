"use client";
import { Card } from "@/components/ui/card";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { useLocalStorage } from "@/hooks/useLocalStorage";
import { ChevronDown, ChevronUp } from "lucide-react";
import { Suspense, useEffect, useState } from "react";
import MetadataInputs from "./metadata-inputs";
import MetadataButtons from "./metadata-buttons";
import {
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import EditorPreview from "./editor-preview";
import { Category } from "@/type";
import { slugify } from "@/lib/utils";

const ThreadMetaData = ({
  categories,
  type,
}: {
  categories: Category[];
  type: "edit" | "add";
}) => {
  const [metaData, setMetaData] = useLocalStorage<any>("thread_metadata", {});
  const [isOpen, setIsOpen] = useState<boolean>(true);
  const [media, setMedia] = useState<File>();

  const [title, setTitle] = useState<string>(metaData.title || "");
  const [slug, setSlug] = useState<string>(metaData.slug || "");
  const [category, setCategory] = useState<string>(metaData.catSlug || "khoa");
  const [thumbnail, setThumbnail] = useState<string>(metaData.thumbnail || "");

  useEffect(() => {
    if (type !== "edit") setMetaData({ ...metaData, id: "" });
  }, []);

  useEffect(() => {
    if (media) setThumbnail(URL.createObjectURL(media as File));
  }, [media]);

  const handleInputs = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const file = e.target.files[0];
      return setMedia(file);
    }

    if (e.target.name === "title") return setTitle(e.target.value);
    if (e.target.name === "slug") setSlug(slugify(e.target.value));
  };

  // Reset MetaData and Text Editor Content
  const handleReset = () => {
    setMetaData({});
    setTitle("");
    setSlug("");
    setThumbnail("");
    window.localStorage.removeItem("thread_metadata");
    window.localStorage.removeItem("old_thumbnail");
    window.localStorage.removeItem("novel__content");
    const editor = document.querySelector(".tiptap.ProseMirror");
    if (editor) editor.innerHTML = "";
  };

  const handlePreview = async () => {
    const threadMetaData = {
      title: title,
      slug: slug,
      catSlug: category,
      thumbnail: thumbnail,
    };

    setMetaData({ ...metaData, ...threadMetaData });
  };

  return (
    <>
      <Card className="sticky top-0 z-10 h-fit flex-1 bg-background">
        <Collapsible open={isOpen} onOpenChange={setIsOpen}>
          <MetadataButtons
            handlePreview={handlePreview}
            handleReset={handleReset}
          />
          <CollapsibleContent>
            <MetadataInputs
              title={title}
              slug={slug}
              category={category}
              thumbnail={thumbnail}
              categories={categories}
              handleInputs={handleInputs}
              setCategory={setCategory}
            />
          </CollapsibleContent>
          <CollapsibleTrigger className="absolute -bottom-3 left-1/2 -translate-x-1/2">
            <div className="rounded-full bg-foreground p-0.5 text-background hover:bg-foreground/50">
              {isOpen ? <ChevronUp /> : <ChevronDown />}
            </div>
          </CollapsibleTrigger>
        </Collapsible>
      </Card>
      <DialogContent className="max-h-[80%] overflow-auto rounded-lg lg:max-w-3xl">
        <DialogHeader>
          <DialogTitle>Preview</DialogTitle>
        </DialogHeader>
        <Suspense>
          <EditorPreview
            type={type}
            metaData={metaData}
            media={media}
            handleReset={handleReset}
          />
        </Suspense>
      </DialogContent>
    </>
  );
};

export default ThreadMetaData;
