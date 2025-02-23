import TableUsers from "@/components/admin/user-management/TableUsers";
import { fetchAllUsers } from "@/lib/actions/admin";

export default async function Page() {
  const response = await fetchAllUsers();
  const users = response?.data?.users;

  return (
    <div className="flex flex-col border border-gray-200 p-4 rounded-md gap-6">
      <h3 className="text-lg font-bold">Quản lý người dùng</h3>
      <TableUsers data={users} />
    </div>
  );
}
