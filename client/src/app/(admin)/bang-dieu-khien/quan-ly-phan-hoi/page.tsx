import TableFeedback from "@/components/admin/feedback-management.tsx/TableFeedback";
import { fetchAllFeedbacks } from "@/lib/actions/admin";

export default async function Page() {
  const response = await fetchAllFeedbacks();
  const feedbacks = response?.data?.feedbacks;

  return (
    <div className="flex flex-col border border-gray-200 p-4 rounded-md gap-6">
      <h3 className="text-lg font-bold">Quản lý phản hồi</h3>
      <TableFeedback data={feedbacks} />
    </div>
  );
}
