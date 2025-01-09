import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import "dayjs/locale/vi";

dayjs.locale("vi");

export const formatDate = (dateString: string) => {
  dayjs.extend(relativeTime);
  return dayjs(dateString).fromNow();
};
