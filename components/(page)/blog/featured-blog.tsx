import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";
import Title from "@/components/ui/title";
import Link from "next/link";
import { formatContent, formatDescription } from "@/lib/utils";
import { Thread } from "@/type";
import CategoryTag from "@/components/shared/category-tag";
import Author from "@/components/shared/author";
import { BASE_API_URL } from "@/lib/constants";
import { useMemo } from "react";

const FeaturedPostBlog = async ({ data }: { data: Thread }) => {
  const content = useMemo(() => {
    return formatContent(data.content);
  }, [data.content]);

  return (
    <Card className="border-none">
      <CardContent>
        <div className="flex flex-col gap-10 md:flex-row">
          <Link
            href={`${BASE_API_URL}/thread/${data.slug}`}
            className="sm:w-unset relative aspect-video w-full flex-1 cursor-pointer overflow-hidden rounded-lg"
          >
            <Image
              src={
                data.thumbnail
                  ? data.thumbnail
                  : "https://images.pexels.com/photos/18022560/pexels-photo-18022560/free-photo-of-thien-nhien-thu-v-t-d-ng-v-t-con-v-t.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
              }
              fill
              alt="feature img"
              className="object-cover transition-transform hover:scale-110"
            />
          </Link>
          <div className="flex flex-1 flex-col gap-3">
            <div>
              <CategoryTag data={{ ...data.cat, slug: data.catSlug }} />
            </div>
            <Link href={`${BASE_API_URL}/thread/${data.slug}`}>
              <Title className="pointer cursor-pointer hover:underline">
                {data.title}
              </Title>
            </Link>
            <p>{formatDescription(content, 300)}</p>
            <Author user={data.user} />
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default FeaturedPostBlog;
