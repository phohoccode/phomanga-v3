import TableUsers from "@/components/admin/user-management/TableUsers";
import { fetchAllUsers } from "@/lib/actions";

export default async function Page({
  searchParams,
}: {
  searchParams?: { [key: string]: string | string[] | undefined };
}) {
  const params = await searchParams;
  const sort = params?.sort || "DESC";
  const page = params?.page || 1;
  const response = await fetchAllUsers(
    page as number,
    sort as "DESC" | "ASC",
    10
  );
  const users = response?.data?.users;
  const totalItems = response?.data?.totalItems;



  return (
    <div className="flex flex-col border border-gray-200 p-4 rounded-md gap-6">
      <h3 className="text-lg font-bold">Quản lý người dùng</h3>
      <TableUsers data={users} />
    </div>
  );
}
