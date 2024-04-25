import RouteTitle from "@/components/management/RouteTitle";
import SectionCard from "@/components/management/section-card";
import { AlertDialog } from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { Metadata } from "next";
import Link from "next/link";
import ListThread from "@/components/management/threads/list-thread";
import { getAuthSession } from "@/auth.config";
import { notFound } from "next/navigation";
import prisma from "@/lib/connect";
import { Prisma } from "@prisma/client";
import FilterThreads from "@/components/management/threads/filter-threads";

export const metadata: Metadata = {
  title: "Thread Management",
  description: "EAUT Management for Threads",
};

const AllThreadPage = async ({
  searchParams,
}: {
  searchParams: {
    slug?: string;
    page?: number;
    q?: string;
    catSlug?: string;
    userId?: string;
  };
}) => {
  const session = await getAuthSession();
  if (!session) return notFound();
  const slug = searchParams.slug || "";
  const page = Number(searchParams.page) || 1;
  const q = searchParams.q || "";
  const catSlug = searchParams.catSlug || "";
  const userId = searchParams.userId || "";

  const query: Prisma.ThreadFindManyArgs = {
    where: {
      AND: [
        {
          title: {
            contains: q,
            mode: "insensitive",
          },
        },
        {
          content: {
            contains: q,
            mode: "insensitive",
          },
        },
        {
          catSlug: {
            contains: catSlug,
            mode: "insensitive",
          },
        },
        {
          user: {
            id: {
              contains: userId,
            },
          },
        },
        {
          userEmail:
            session.user.role === "ADMIN" || session.user.role === "MODERATOR"
              ? { contains: "" }
              : session.user.email!,
        },
      ],
    },
    include: {
      cat: {
        select: {
          title: true,
          color: true,
          slug: true,
        },
      },
      user: {
        select: {
          email: true,
          name: true,
          image: true,
        },
      },
      _count: {
        select: {
          votes: true,
        },
      },
    },
    take: 8,
    skip: 8 * (page - 1),
    orderBy: {
      createdAt: "desc",
    },
  };

  const [total, data] = await prisma.$transaction([
    prisma.thread.count({
      where: {
        AND: [
          {
            title: {
              contains: q,
              mode: "insensitive",
            },
          },
          {
            catSlug: {
              contains: catSlug,
              mode: "insensitive",
            },
          },
          {
            user: {
              id: {
                contains: userId,
              },
            },
          },
          {
            userEmail:
              session.user.role === "ADMIN" || session.user.role === "MODERATOR"
                ? { contains: "" }
                : session.user.email!,
          },
        ],
      },
    }),
    prisma.thread.findMany({
      ...query,
    }),
  ]);

  const category = await prisma.category.findMany({});
  const writers =
    (session.user.role === "MODERATOR" || session.user.role === "ADMIN") &&
    (await prisma.user.findMany({
      where: {
        OR: [{ role: "MODERATOR" }, { role: "WRITER" }],
      },
      select: {
        id: true,
        name: true,
        image: true,
      },
    }));

  return (
    <AlertDialog>
      <RouteTitle text="My Thread" />
      <SectionCard>
        <div className="flex justify-between py-3 pr-1">
          <FilterThreads
            page={page}
            category={category}
            role={session.user.role}
            writers={writers}
          />
          <Button asChild>
            <Link href={"editor?type=add"}>New Thread</Link>
          </Button>
        </div>
        <ListThread
          total={total}
          // @ts-ignore
          data={data}
          slug={slug}
          currentPage={page}
          session={session}
        />
      </SectionCard>
    </AlertDialog>
  );
};

export default AllThreadPage;
