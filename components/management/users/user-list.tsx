"use client";
import { Dialog } from "@/components/ui/dialog";
import { AllUser } from "@/type";
import { useRouter } from "next/navigation";
import UserCard from "./user-card";
import UserDialog from "./user-dialog";
import { useSession } from "next-auth/react";

const UserList = ({ data, userId }: { data: AllUser[]; userId: string }) => {
  const router = useRouter();
  const dataFound = data.find((r) => r.id === userId);
  const session = useSession();
  const userSession = session?.data?.user as AllUser;

  const handleOpen = () => {
    if (userId) router.replace("users");
  };

  return (
    <Dialog open={!!userId} onOpenChange={handleOpen}>
      <div className="mt-5 grid grid-cols-1 gap-5 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4">
        {data &&
          data.map((user) => (
            <UserCard
              key={user.id}
              data={user}
              router={router}
              userSession={userSession}
            />
          ))}
      </div>
      {userId && dataFound && (
        <UserDialog
          data={dataFound}
          userSession={userSession}
          router={router}
        />
      )}
    </Dialog>
  );
};

export default UserList;
