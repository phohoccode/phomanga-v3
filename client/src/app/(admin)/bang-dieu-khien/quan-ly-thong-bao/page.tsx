import CreateNotification from "@/components/admin/notification-management/CreateNotification";
import ModalActionsNotification from "@/components/admin/notification-management/ModalActionsNotification";
import TableNotification from "@/components/admin/notification-management/TableNotification";
import { fetchAllNotifications } from "@/lib/actions";

export default async function Page() {
  const response = await fetchAllNotifications();
  const notification = response?.data?.notifications;

  return (
    <div className="flex flex-col border border-gray-200 p-4 rounded-md gap-6">
      <h3 className="text-lg font-bold">Quản lý thông báo</h3>

      <CreateNotification />

      <TableNotification data={notification} />

      <ModalActionsNotification />
    </div>
  );
}
