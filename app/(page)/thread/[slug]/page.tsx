import BlogSide from "@/components/(page)/blog/blog-side";
import CommentSection from "@/components/(page)/single-thread/comment-section";
import ThreadVote from "@/components/(page)/single-thread/thread-vote";
import CategoryTag from "@/components/shared/category-tag";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import Title from "@/components/ui/title";
import { BASE_API_URL } from "@/lib/constants";
import { formatContent, formatDate } from "@/lib/utils";
import { SingleThread as SingleThreadType } from "@/type";
import { Bell, Bookmark } from "lucide-react";
import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

type Props = {
  params: { slug: string };
  searchParams: { [key: string]: string | string[] | undefined };
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  // read route params
  const slug = params.slug;

  // fetch data
  const res = await fetch(`${BASE_API_URL}/api/thread/${slug}`);
  const data = await res.json();

  return {
    title: data.title,
  };
}

const SingleThread = async ({ params }: { params: { slug: string } }) => {
  const { slug } = params;
  const res = await fetch(`${BASE_API_URL}/api/thread/${slug}`, {
    cache: "no-store",
  });
  const data: SingleThreadType = await res.json();
  const html = formatContent(data.content);

  return (
    data && (
      <article className="pb-6 sm:container">
        <Card className="bg-background">
          <div className="flex items-center gap-1 py-3 pl-6 ">
            <Link href={"/"} className="underline text-primary">Home</Link>
            {" / "}
            <CategoryTag data={data.cat} />
            {" / "}
            <p> {data.title}</p>
          </div>
          <CardContent className="flex gap-5 pb-6">
            <div className="flex flex-[3] flex-col gap-5">
              <Title className="hover:text-primary md:text-3xl lg:text-4xl">
                {data.title}
              </Title>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Avatar>
                    <AvatarImage src={data.user.image} />
                    <AvatarFallback>CN</AvatarFallback>
                  </Avatar>
                  <div className="">
                    <p className="cursor-pointer text-lg font-bold text-primary">
                      {data.user.name}
                    </p>
                    <span className="text-sm">
                      {data.createdAt && formatDate(data.createdAt)} - Phản hồi:{" "}
                      {data._count["comments"] || 0}
                    </span>
                  </div>
                </div>
                <div className="flex gap-3">
                  <Bookmark className="cursor-pointer hover:text-neutral-400" />
                  <Bell className="cursor-pointer hover:text-neutral-400" />
                </div>
              </div>
              <Separator />
              {data.thumbnail && (
                <figure className="relative aspect-video w-full">
                  <Image
                    src={data.thumbnail}
                    alt="thumbnail"
                    fill
                    className="rounded-lg object-cover"
                  />
                  <figcaption aria-disabled aria-hidden>
                    Hình ảnh
                  </figcaption>
                </figure>
              )}
              <div
                className="prose max-w-full dark:prose-invert"
                dangerouslySetInnerHTML={{ __html: html }}
              ></div>
              <div className="my-4 border-y-2 text-center font-bold">
                <ThreadVote
                  commentCount={data._count["comments"]}
                  slug={slug}
                />
              </div>
              <CommentSection threadSlug={params.slug} />
            </div>
            <BlogSide />
          </CardContent>
        </Card>
      </article>
    )
  );
};

export default SingleThread;
