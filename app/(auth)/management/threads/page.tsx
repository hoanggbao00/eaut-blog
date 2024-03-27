import RouteTitle from "@/components/management/RouteTitle";
import SectionCard from "@/components/management/section-card";
import { AlertDialog } from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { Metadata } from "next";
import Link from "next/link";
import ListThread from "@/components/management/threads/list-thread";

export const metadata: Metadata = {
  title: "Thread Management",
  description: "EAUT Management for Threads",
};

const AllThreadPage = async ({
  searchParams,
}: {
  searchParams: { slug: string };
}) => {
  const { slug } = searchParams || "";
  return (
    <AlertDialog>
      <RouteTitle text="My Thread" />
      <SectionCard>
        <div className="sticky top-0 z-10 flex justify-between py-3 pr-1">
          <h1 className="text-5xl font-bold">Filter go here</h1>
          <Button asChild>
            <Link href={"editor?type=add"}>New Thread</Link>
          </Button>
        </div>
        <ListThread slug={slug} />
      </SectionCard>
    </AlertDialog>
  );
};

export default AllThreadPage;
