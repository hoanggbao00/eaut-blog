"use client";
import { Dialog } from "@/components/ui/dialog";
import { Thread } from "@/type";
import ThreadPreview from "./thread-preview";
import { usePathname, useRouter } from "next/navigation";
import useSWR from "swr";
import ThreadCard2 from "./thread-card2";
import ConfirmDelete from "./confirm-delete";
import { useState } from "react";
import ClientPagination from "@/components/(page)/homepage/client-pagination";

const fetcher = async (url: string) => {
  const res = await fetch(url);
  const data = await res.json();

  if (!res.ok) throw new Error("Error fetching");
  return data;
};

const ListThread = ({
  slug,
  currentPage,
}: {
  slug: string;
  currentPage: number;
}) => {
  const { data, mutate, isLoading } = useSWR<{ total: number; data: Thread[] }>(
    `/api/thread?perPage=12&page=${currentPage}`,
    fetcher,
  );

  const threads = data && data.data;
  const totalPage = (data && Math.floor(data.total / 12) + 1) || 1;
  const [open, setOpen] = useState<boolean>(!!slug);
  const router = useRouter();
  const pathname = usePathname();
  const find = threads && threads.find((t) => t.slug === slug);

  const handleOpen = () => {
    if (slug) router.replace(`${pathname}?page=${currentPage}`);

    setOpen(!open);
  };

  return (
    <>
      <Dialog open={open} onOpenChange={handleOpen}>
        <div>
          <ClientPagination totalPage={totalPage} currentPage={currentPage} />
          {!isLoading ? (
            <div className="grid grid-cols-2 gap-5 pt-4 md:grid-cols-3 lg:grid-cols-4">
              {threads &&
                threads.map((thread) => (
                  <ThreadCard2 key={thread.id} thread={thread} />
                ))}
            </div>
          ) : (
            "Loading content..."
          )}
        </div>
        {slug && find && <ThreadPreview data={find} />}
      </Dialog>
      {slug && find && (
        <ConfirmDelete slug={find.slug} mutate={mutate} setOpen={setOpen} />
      )}
    </>
  );
};

export default ListThread;
