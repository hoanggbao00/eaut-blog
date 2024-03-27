import RouteTitle from "@/components/management/RouteTitle";
import SectionCard from "@/components/management/section-card";
import UserCard from "@/components/management/users/user-card";
import { BASE_API_URL } from "@/lib/constants";
import { AllUser } from "@/type";
import { Suspense } from "react";

const UserPage = async () => {
  const res = await fetch(`${BASE_API_URL}/api/user`, {
    cache: "no-store",
  });

  const data: AllUser[] = await res.json();
  return (
    <>
      <RouteTitle text="User Management" />

    </>
  );
};

export default UserPage;
