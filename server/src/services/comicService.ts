import { error_server } from "../lib/define";
import SavedComic from "../models/SavedComic";
import ViewedComic from "../models/ViewedHistory";

const handleGetAllSavedComic = async (userId: string) => {
  try {
    const data = await SavedComic.find({ userId });

    return {
      status: "sussess",
      message: "Lấy danh sách truyện đã lưu thành công",
      data,
    };
  } catch (error) {
    console.log(">>> error-getAllSavedComic", error);
    return error_server;
  }
};

const handleSaveComic = async (rawData: any) => {
  try {
    const { dataComic, userId } = rawData;

    let res = await SavedComic.findOne({ userId });

    if (!res) {
      res = new SavedComic({ userId, comics: [] });
    }

    const isExist = res?.comics?.some(
      (comic) => comic?.slug === dataComic?.slug
    );

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
        status: "sussess",
        message: "Lưu truyện thành công",
      };
    }
  } catch (error) {
    console.log(">>> error-saveComic", error);
    return error_server;
  }
};

const handleDeleteComic = async (rawData: any) => {
  try {
    const { comicSlug, userId } = rawData;

    const data: any = await SavedComic.findOne({ userId });

    data.comics = data?.comics.filter((comic: any) => comic.slug !== comicSlug);
    await data.save();

    if (!data) {
      return {
        status: "error",
        error_code: "error-delete-comic",
        message: "Xóa truyện thất bại",
      };
    }

    return {
      status: "sussess",
      message: "Xóa truyện thành công",
    };
  } catch (error) {
    console.log(">>> error-deleteComic", error);
    return error_server;
  }
};

export { handleSaveComic, handleDeleteComic, handleGetAllSavedComic };
