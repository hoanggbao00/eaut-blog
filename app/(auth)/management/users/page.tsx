import RouteTitle from "@/components/management/RouteTitle";
import SectionCard from "@/components/management/section-card";
import UserList from "@/components/management/users/user-list";
import { BASE_API_URL } from "@/lib/constants";
import { AllUser } from "@/type";

const UserPage = async ({
  searchParams,
}: {
  searchParams: { user: string };
}) => {
  const userId = searchParams.user || "";
  const res = await fetch(`${BASE_API_URL}/api/user`, {
    cache: "no-store",
  });

  const data: AllUser[] = await res.json();
  return (
    <>
      <RouteTitle text="User Management" />
      <SectionCard className="text-center">
        <div className="border-b-2 border-border py-2">
          <p>Filter and search go here</p>
        </div>
        <UserList data={data} userId={userId} />
      </SectionCard>
    </>
  );
};

export default UserPage;
