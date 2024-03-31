import NotificationList from "@/components/management/notifications/notification-list";
import NotificationForm from "@/components/management/notifications/NotificationForm";
import RouteTitle from "@/components/management/RouteTitle";
import SectionCard from "@/components/management/section-card";
import { Separator } from "@/components/ui/separator";
import { BASE_API_URL } from "@/lib/constants";
import { Notification } from "@/type";
const NotificationsManagement = async ({
  searchParams,
}: {
  searchParams: { id: string };
}) => {
  const notificationId = searchParams.id;

  const notificationRes = await fetch(`${BASE_API_URL}/api/notification`, {
    cache: "no-store",
  });
  const data: Notification[] = await notificationRes.json();
  const found = notificationId
    ? data.find((item) => item.id === notificationId)
    : undefined;

  return (
    <>
      <RouteTitle text="Notification Management" />
      <SectionCard>
        <NotificationForm />
        <Separator className="my-4" />
        <NotificationList data={data} id={notificationId} found={found}/>
      </SectionCard>
    </>
  );
};

export default NotificationsManagement;
