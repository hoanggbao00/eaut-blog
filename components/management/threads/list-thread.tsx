"use client";
import { Dialog } from "@/components/ui/dialog";
import { Thread } from "@/type";
import ThreadPreview from "./thread-preview";
import { usePathname, useRouter } from "next/navigation";
import ThreadCard2 from "./thread-card2";
import ConfirmDelete from "./confirm-delete";
import { useState } from "react";
import ClientPagination from "@/components/(page)/homepage/client-pagination";
import { Session } from "next-auth";

const ListThread = ({
  slug,
  currentPage,
  session,
  total,
  data,
}: {
  slug: string;
  currentPage: number;
  session: Session;
  total: number;
  data: Thread[]
}) => {
  const user = session.user;

  const threads = data;
  const totalPage = (data && Math.floor(total / 8) + 1) || 1;
  const [open, setOpen] = useState<boolean>(!!slug);
  const router = useRouter();
  const pathname = usePathname();
  const find = threads && threads.find((t) => t.slug === slug);

  const handleOpen = () => {
    if (slug)
      router.replace(
        `${pathname}?perPage=10&page=${currentPage}${user?.email ? "&userEmail=" + user.email : ""}`,
      );

    setOpen(!open);
  };

  return (
    <>
      <Dialog open={open} onOpenChange={handleOpen}>
        <div>
          <ClientPagination totalPage={totalPage} currentPage={currentPage} />
          {data ? (
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
      {slug && find && <ConfirmDelete slug={find.slug} setOpen={setOpen} />}
    </>
  );
};

export default ListThread;
