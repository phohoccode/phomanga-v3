import { error_server } from "../lib/define";
import {
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

    const data: any =
      type === "GET_ALL_SAVED_COMIC"
        ? await SavedComic.find({ userId })
        : await ViewedComic.find({ userId });

    const items = data?.[0]?.comics
      ?.slice(skip, skip + itemsPerPage)
      ?.reverse();

    const totalItems = data?.[0]?.comics?.length;

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
    console.log(">>> error", error);
    return error_server;
  }
};

const handleSaveComic = async (rawData: rawDataSaveComic) => {
  try {
    const { dataComic, userId, type } = rawData;

    let res =
      type === "SAVED_COMIC"
        ? await SavedComic.findOne({ userId })
        : await ViewedComic.findOne({ userId });

    if (!res) {
      res =
        type === "SAVED_COMIC"
          ? new SavedComic({ userId, comics: [] })
          : new ViewedComic({ userId, comics: [] });
    }

    let isExist = false;

    if (type === "SAVED_COMIC") {
      isExist = res?.comics?.some(
        (comic: any) => comic.slug === dataComic?.slug
      );
    } else if (type === "VIEWED_COMIC") {
      isExist = res?.comics?.some((comic: any) => comic.id === dataComic?.id);
    }

    if (isExist) {
      return {
        status: "error",
        error_code: "error-exist-comic",
        message: "Truyện đã tồn tại trong hệ thống!",
      };
    }

    if (!isExist) {
      res?.comics?.push(dataComic);
      const data = await res?.save();

      if (!data) {
        return {
          status: "error",
          error_code: "error-save-comic",
          message: "Lưu truyện thất bại",
        };
      }

      return {
        status: "success",
        message: "Lưu truyện thành công",
      };
    }
  } catch (error) {
    console.log(">>> error-saveComic", error);
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

    if (type === "SAVED_COMIC") {
      data.comics = data?.comics.filter(
        (comic: any) => comic.slug !== comicSlug
      );
    } else if (type === "VIEWED_COMIC") {
      data.comics = data?.comics.filter((comic: any) => comic.id !== comicId);
    }

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
    console.log(">>> error-deleteComic", error);
    return error_server;
  }
};

export { handleSaveComic, handleDeleteComic, handleGetAllComic };
