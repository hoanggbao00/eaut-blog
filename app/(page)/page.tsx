import CategorySection from "@/components/(page)/homepage/category-section/category-section";
import FeaturedThread from "@/components/(page)/homepage/featured-thread";
import HomeStatus from "@/components/(page)/homepage/home-status";
import NotificationSection from "@/components/(page)/homepage/notification/notification-section";
import PopularThreads from "@/components/(page)/homepage/popular-threads";
import RecentThreads from "@/components/(page)/homepage/recent-threads";
import { BASE_API_URL } from "@/lib/constants";
import { Suspense } from "react";

export const runtime = "edge";

const HomePage = async ({
  searchParams,
}: {
  searchParams: { page: number };
}) => {
  const currentPage = Number(searchParams.page) || 1;

  const res = await fetch(`${BASE_API_URL}/api/thread?page=${currentPage}`, {
    method: "GET",
    next: {
      revalidate: 60,
    },
  });

  const { total, data } = await res.json();
  const totalPage = Math.floor(total / 6) + 1;

  return (
    <div className="flex flex-col gap-y-10 px-3 sm:container">
      <Suspense fallback={"loading status ..."}>
        <HomeStatus />
      </Suspense>
      <section className="flex flex-col gap-5 md:flex-row">
        {data && <FeaturedThread data={data[0]} />}
        <Suspense fallback={"loading"}>
          <NotificationSection />
        </Suspense>
      </section>
      <CategorySection />
      {data && (
        <>
          <RecentThreads
            data={data}
            currentPage={currentPage}
            totalPage={totalPage}
          />
          <Suspense>
            <PopularThreads data={data} />
          </Suspense>
        </>
      )}
    </div>
  );
};

export default HomePage;
