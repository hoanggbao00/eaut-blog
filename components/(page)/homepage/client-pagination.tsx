"use client";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { useRouter } from "next/navigation";

const ClientPagination = ({
  totalPage,
  currentPage,
}: {
  totalPage: number;
  currentPage: number;
}) => {
  const router = useRouter();
  const handlePageChange = (page: number) => {
    if (page === currentPage) return;
    router.push(`?page=${page}`, { scroll: false });
  };

  return (
    totalPage > 1 && (
      <Pagination>
        <PaginationContent>
          {currentPage !== 1 && (
            <PaginationItem>
              <PaginationPrevious
                onClick={() => handlePageChange(currentPage - 1)}
              />
            </PaginationItem>
          )}
          {Array.from(Array(totalPage), (e, page) => (
            <PaginationItem key={page}>
              <PaginationLink
                onClick={() => handlePageChange(page + 1)}
                isActive={currentPage === page + 1}
              >
                {page + 1}
              </PaginationLink>
            </PaginationItem>
          ))}
          {currentPage !== totalPage && (
            <PaginationItem>
              <PaginationNext
                onClick={() => handlePageChange(currentPage + 1)}
              />
            </PaginationItem>
          )}
        </PaginationContent>
      </Pagination>
    )
  );
};

export default ClientPagination;
