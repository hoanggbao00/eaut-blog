// import BlogSide from "@/components/page/blog/blog-side";
import BlogSide from "@/components/(page)/blog/blog-side";
import BlogTitle from "@/components/(page)/blog/blog-title";
import FeaturedPostBlog from "@/components/(page)/blog/featured-blog";
import RecentThreads from "@/components/(page)/homepage/recent-threads";
import CategoryTag from "@/components/shared/category-tag";
import { BASE_API_URL } from "@/lib/constants";
import { Category } from "@/type";
import { Metadata } from "next";
import Link from "next/link";

type Props = {
  params: { slug: string };
  searchParams: { [key: string]: string };
};

export async function generateMetadata({
  searchParams,
}: Props): Promise<Metadata> {
  // read route params
  const { cat } = searchParams;

  // fetch data
  const res = await fetch(`${BASE_API_URL}/api/category/${cat}`, {
    method: "GET",
    next: {
      revalidate: 60,
    },
  });
  const data: Category = await res.json();

  return {
    title: data ? data.title : "Blog",
  };
}

const BlogPage = async ({ searchParams }: Props) => {
  const catRes = await fetch(`${BASE_API_URL}/api/category/`, {
    method: "GET",
    next: {
      revalidate: 60,
    },
  });
  const catData: Category[] = await catRes.json();

  const cat = searchParams.cat || "";
  const res = await fetch(
    `${BASE_API_URL}/api/thread${cat ? "?catSlug=" + cat : ""}`,
    {
      method: "GET",
      cache: "no-store",
    },
  );
  const data = await res.json();

  return (
    <div className="container flex flex-col gap-5 pb-3 pt-2">
      {catData && (
        <div className="-mx-5 flex flex-wrap items-center gap-2 gap-y-4 pb-2 md:mx-0 md:hidden">
          <Link href={"../"} className="font-semibold text-primary underline">
            Home /
          </Link>
          {catData.map((c) => (
            <CategoryTag key={c.slug} data={c} />
          ))}
        </div>
      )}
      {cat && <BlogTitle cat={cat} />}
      {data[0] && <FeaturedPostBlog data={data[0]} />}
      <div className="flex gap-5">
        <div className="flex-[3]">
          <RecentThreads
            className="flex flex-col gap-0 md:gap-0"
            itemOrientation="horizontal"
            data={data}
          />
        </div>
        <BlogSide />
      </div>
    </div>
  );
};

export default BlogPage;
