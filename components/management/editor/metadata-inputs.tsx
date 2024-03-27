import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import CategorySelect from "./category-select";
import Image from "next/image";
import React from "react";
import { Category } from "@/type";
const MetadataInputs = ({
  categories,
  title,
  slug,
  category,
  handleInputs,
  setCategory,
  thumbnail,
  type
}: {
  categories: Category[];
  title: string;
  slug: string;
  handleInputs: (e: React.ChangeEvent<HTMLInputElement>) => void;
  category: string;
  setCategory: (e: any) => void;
  thumbnail: string;
  type: "edit" | "add";
}) => {

  return (
    <CardContent className="space-y-4">
      <div className="flex items-center">
        <Label
          htmlFor="title"
          className="text-md w-[120px] font-semibold lg:text-lg"
        >
          Title
        </Label>
        <Input
          id="title"
          name="title"
          type="text"
          placeholder="Title..."
          className="w-full"
          value={title}
          onChange={handleInputs}
        />
      </div>
      <div className="flex items-center">
        <Label
          htmlFor="slug"
          className="text-md w-[120px] font-semibold lg:text-lg"
        >
          Slug
        </Label>
        <Input
          id="slug"
          name="slug"
          className="text-md w-full"
          placeholder="your slug here"
          value={slug}
          onChange={handleInputs}
          disabled={type === 'edit'}
        />
      </div>
      <div className="flex items-center">
        <p className="text-md w-[120px] font-semibold lg:text-lg">Category</p>
        <CategorySelect
          handleUpdate={setCategory}
          defaultValue={category}
          categories={categories}
        />
      </div>
      <div className="space-y-1">
        <Label htmlFor="thumbnail" className="text-md">
          Thumbnail Image
        </Label>
        <Input
          onChange={handleInputs}
          id="thumbnail"
          name="thumbnail"
          type="file"
          className="w-full"
          accept="image/png, image/jpeg"
        />
      </div>
      {thumbnail && (
        <Card className="bg-background">
          <CardContent className="relative mx-auto aspect-video h-[300px]">
            <Image
              fill
              src={thumbnail}
              className="object-contain"
              alt="thumbnail"
            />
          </CardContent>
        </Card>
      )}
    </CardContent>
  );
};

export default MetadataInputs;
