import RouteTitle from "@/components/management/RouteTitle";
import SectionCard from "@/components/management/section-card";
import UserCard from "@/components/management/users/user-card";
import { BASE_API_URL } from "@/lib/constants";
import { AllUser } from "@/type";

const UserPage = async () => {
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
        <div className="mt-5 grid grid-cols-1 gap-5 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4">
          {data && data.map((user) => <UserCard key={user.id} data={user} />)}
        </div>
      </SectionCard>
    </>
  );
};

export default UserPage;
