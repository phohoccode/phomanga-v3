import { Request, Response } from "express";
import {
  handleDeleteAllComic,
  handleDeleteComic,
  handleGetAllComic,
  handleSaveComic,
} from "../services/comicService";
import { error_server } from "../lib/define";

const getAllComic = async (req: Request, res: Response): Promise<any> => {
  try {
    if (!req.body?.userId) {
      return res.status(500).json({
        message: "userId là bắt buộc",
      });
    }

    const response = await handleGetAllComic(req.body);

    return res.status(200).json(response);
  } catch (error) {
    console.log(error);
    return res.status(500).json(error_server);
  }
};

const saveComic = async (req: Request, res: Response): Promise<any> => {
  try {
    const { dataComic, userId } = req.body;

    if (!dataComic || !userId) {
      return res.status(500).json({
        message: "DataComic và userId là bắt buộc",
      });
    }

    const response = await handleSaveComic(req.body);

    return res.status(200).json(response);
  } catch (error) {
    console.log(error);
    return res.status(500).json(error_server);
  }
};

const deleteComic = async (req: Request, res: Response): Promise<any> => {
  try {
    const { comicSlug, userId } = req.body;

    if (!comicSlug || !userId) {
      return res.status(500).json({
        message: "comicSlug và userId là bắt buộc",
      });
    }

    const response = await handleDeleteComic(req.body);

    return res.status(200).json(response);
  } catch (error) {
    console.log(error);
    return res.status(500).json(error_server);
  }
};

const deleteAllComic = async (req: Request, res: Response): Promise<any> => {
  try {
    const { userId, type } = req.body;

    if (!userId || !type) {
      return res.status(500).json({
        message: "userId và type là bắt buộc",
      });
    }

    const response = await handleDeleteAllComic(req.body);

    return res.status(200).json(response);
  } catch (error) {
    console.log(error);
    return res.status(500).json(error_server);
  }
};

export { saveComic, deleteComic, getAllComic, deleteAllComic };
