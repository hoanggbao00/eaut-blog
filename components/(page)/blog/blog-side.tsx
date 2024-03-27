import CategoryTag from "@/components/shared/category-tag";
import SideItem from "./side-item";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Category, Thread } from "@/type";
import { BASE_API_URL } from "@/lib/constants";
import { Separator } from "@/components/ui/separator";

const BlogSide = async ({categories}: {categories: Category[]}) => {
  const threadRes = await fetch(`${BASE_API_URL}/api/thread`, {
    next: {
      revalidate: 60,
    },
  });
  const threads: Thread[] = await threadRes.json();

  return (
    <aside className="hidden flex-1 flex-col gap-3 md:flex">
      <Card className="border-none bg-transparent shadow-none">
        <CardHeader>
          <CardTitle>Categories</CardTitle>
          <CardDescription>Discovery post by Category</CardDescription>
        </CardHeader>
        <CardContent className="pb-0">
          <div className="flex flex-wrap gap-2">
            {categories.map((cat) => (
              <CategoryTag
                className="rounded-lg px-3 py-2 text-background"
                data={cat}
                key={cat.slug}
              />
            ))}
          </div>
        </CardContent>
      </Card>
      <Separator className="my-4" />
      <Card className="border-none bg-transparent shadow-none">
        <CardHeader>
          <CardTitle>Most popular</CardTitle>
          <CardDescription>Most popular</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col gap-4">
            {threads.map((thread) => (
              <SideItem key={thread.slug} data={thread} />
            ))}
          </div>
        </CardContent>
      </Card>
    </aside>
  );
};

export default BlogSide;
