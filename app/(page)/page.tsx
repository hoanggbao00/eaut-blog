import CategorySection from "@/components/(page)/homepage/category-section/category-section";
import FeaturedThread from "@/components/(page)/homepage/featured-thread";
import HomeStatus from "@/components/(page)/homepage/home-status";
import NotificationSection from "@/components/(page)/homepage/notification/notification-section";
import PopularThreads from "@/components/(page)/homepage/popular-threads";
import RecentThreads from "@/components/(page)/homepage/recent-threads";
import { BASE_API_URL } from "@/lib/constants";
import { Suspense } from "react";
import { Notification } from "@/type";
import { CompareDate, getISOLocalString } from "@/lib/utils";

export const runtime = "edge";

const HomePage = async ({
  searchParams,
}: {
  searchParams: { page: number; notificationId: string };
}) => {
  const currentPage = Number(searchParams.page) || 1;
  const notificationId = searchParams.notificationId || "";

  const res = await fetch(`${BASE_API_URL}/api/thread?page=${currentPage}`, {
    method: "GET",
    next: {
      revalidate: 60,
    },
  });

  const notificationRes = await fetch(`${BASE_API_URL}/api/notification?take=5`, {
    next: {
      revalidate: 60,
    },
  });

  const popularRes = await fetch(`${BASE_API_URL}/api/thread/popular`, {
    method: "GET",
    next: {
      revalidate: 60,
    },
  });
  const popularData = await popularRes.json()

  const notificationData:Notification[] = await notificationRes.json();
  const found = notificationData && notificationData.find(item => item.id === notificationId)

  const waitingData = notificationData.filter(
    (item) => !CompareDate(new Date(item.startFrom), getISOLocalString()),
  );

  const onGoingData = notificationData.filter(
    (item) =>
      CompareDate(new Date(item.startFrom), getISOLocalString()) &&
      !(item.endTo && CompareDate(new Date(item.endTo), getISOLocalString())),
  );

  const { total, data } = await res.json();
  const totalPage = Math.ceil(total / 6);

  return (
    <div className="flex flex-col gap-y-10 px-3 sm:container">
      <Suspense fallback={"loading status ..."}>
        <HomeStatus />
      </Suspense>
      <section className="flex flex-col gap-5 md:flex-row">
        {data[0] && <FeaturedThread data={data[0]} />}
        <NotificationSection data={[...waitingData, ...onGoingData]} found={found} notificationId={notificationId} />
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
            <PopularThreads data={popularData} />
          </Suspense>
        </>
      )}
    </div>
  );
};

export default HomePage;
