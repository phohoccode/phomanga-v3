import TableComments from "@/components/admin/comment-management/TableComments";
import { fetchAllComments } from "@/lib/actions";

export default async function Page() {
  const response = await fetchAllComments();
  const comments = response?.data?.comments;

  return (
    <div className="flex flex-col border border-gray-200 p-4 rounded-md gap-6">
      <h3 className="text-lg font-bold">Quản lý bình luận</h3>
      <TableComments data={comments} />
    </div>
  );
}
