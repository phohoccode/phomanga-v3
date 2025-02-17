import { error_server } from "../lib/define";
import {
  rawDataDeleteAllComic,
  rawDataDeleteComic,
  rawDataGetComic,
  rawDataSaveComic,
} from "../lib/types";
import SavedComic from "../models/SavedComic";
import ViewedComic from "../models/ViewedHistory";

const handleGetAllComic = async (rawData: rawDataGetComic) => {
  try {
    const { page, userId, type } = rawData;

    const itemsPerPage = 24;

    const skip = ((isNaN(Number(page)) ? 1 : Number(page)) - 1) * itemsPerPage;

    let data: any =
      type === "GET_ALL_SAVED_COMIC"
        ? await SavedComic.find({ userId })
        : await ViewedComic.find({ userId });

    data?.[0]?.comics?.sort(
      (a: any, b: any) =>
        new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    );

    const finalData = data?.[0]?.comics?.filter(
      (item: any) => item.is_deleted === false
    );

    const items =
      Number(page) === 0 || Number(page) === -1
        ? finalData
        : finalData?.slice(skip, skip + itemsPerPage);

    const totalItems = finalData?.length;

    return {
      status: "success",
      message: "Lấy danh sách truyện thành công",
      data: {
        items,
        totalItems,
        type,
      },
    };
  } catch (error) {
    console.log(error);
    return error_server;
  }
};

const handleSaveComic = async (rawData: rawDataSaveComic) => {
  try {
    const { dataComic, userId, type, username, avatar } = rawData;

    let res =
      type === "SAVED_COMIC"
        ? await SavedComic.findOne({ userId })
        : await ViewedComic.findOne({ userId });

    if (!res) {
      res =
        type === "SAVED_COMIC"
          ? new SavedComic({ userId, username, avatar, comics: [] })
          : new ViewedComic({ userId, username, avatar, comics: [] });
    }

    const indexComicExist = res?.comics?.findIndex((comic: any) => {
      if (type === "SAVED_COMIC") {
        return comic.slug === dataComic?.slug;
      } else if (type === "VIEWED_COMIC") {
        return comic.id === dataComic?.id;
      }
    });

    if (indexComicExist !== -1) {
      res.comics[indexComicExist].is_deleted = false;
    } else {
      res.comics.push(dataComic);
    }

    res.markModified("comics");

    await res.save();

    return {
      status: "success",
      message: "Lưu truyện thành công",
    };
  } catch (error) {
    console.log(error);
    return error_server;
  }
};

const handleDeleteComic = async (rawData: rawDataDeleteComic) => {
  try {
    const { comicSlug, comicId, userId, type } = rawData;

    let data: any =
      type === "SAVED_COMIC"
        ? await SavedComic.findOne({ userId })
        : await ViewedComic.findOne({ userId });

    const indexComicDelete = data?.comics?.findIndex((comic: any) => {
      if (type === "SAVED_COMIC") {
        return comic.slug === comicSlug;
      } else if (type === "VIEWED_COMIC") {
        return comic.id === comicId;
      }
    });

    data.comics[indexComicDelete].is_deleted = true;

    data.markModified("comics");

    await data.save();

    if (!data) {
      return {
        status: "error",
        error_code: "error-delete-comic",
        message: "Xóa truyện thất bại",
      };
    }

    return {
      status: "success",
      message: "Xóa truyện thành công",
    };
  } catch (error) {
    console.log(error);
    return error_server;
  }
};

const handleDeleteAllComic = async (rawData: rawDataDeleteAllComic) => {
  try {
    const { userId, type } = rawData;

    let data: any = null;

    type === "SAVED_COMIC"
      ? (data = await SavedComic.findOne({ userId }))
      : (data = await ViewedComic.findOne({ userId }));

    data.comics?.forEach((comic: any) => {
      comic.is_deleted = true;
    });

    data.markModified("comics");

    await data.save();

    return {
      status: "success",
      message:
        type === "SAVED_COMIC"
          ? "Đã xóa tất cả truyện lưu"
          : "Đã xoá lịch sử đã xem",
    };
  } catch (error) {
    console.log(error);
    return error_server;
  }
};

export {
  handleSaveComic,
  handleDeleteComic,
  handleGetAllComic,
  handleDeleteAllComic,
};
