"use client";
import {
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { BASE_API_URL } from "@/lib/constants";
import { usePathname, useRouter } from "next/navigation";

// TODO: Handle alert delete when success
const ConfirmDelete = ({
  slug,
  setOpen,
}: {
  slug: string;
  setOpen: (e: boolean) => void;
}) => {
  const router = useRouter();
  const pathname = usePathname();

  const handleDelete = async () => {
    const res = await fetch(`/api/thread/${slug}`, {
      method: "DELETE",
    });
    
    if (res.status === 404) return alert("Something went wrong");
    alert("Delete Successfully");
    setOpen(false);
    router.replace(pathname);
    router.refresh()
  };

  return (
    <AlertDialogContent>
      <AlertDialogHeader>
        <AlertDialogTitle>
          Are you absolutely sure to delete this Thread?
        </AlertDialogTitle>
        <AlertDialogDescription>
          This action cannot be undone. This will permanently delete your
          account and remove your data from our servers.
        </AlertDialogDescription>
      </AlertDialogHeader>
      <AlertDialogFooter>
        <AlertDialogCancel>Cancel</AlertDialogCancel>
        <AlertDialogAction asChild>
          <Button
            variant="destructive"
            className="!bg-destructive !text-destructive-foreground hover:!bg-destructive/50"
            onClick={handleDelete}
          >
            I{"'"}m Sure
          </Button>
        </AlertDialogAction>
      </AlertDialogFooter>
    </AlertDialogContent>
  );
};

export default ConfirmDelete;
