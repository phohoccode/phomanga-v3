import { Request, Response } from "express";
import {
  handleDeleteComic,
  handleGetAllComic,
  handleSaveComic,
} from "../services/comicService";

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
    console.log(">>> error-getAllSavedComic", error);
    return res.status(500).json({ message: "Internal Server Error", error });
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
    console.log(">>> error-saveComic", error);
    return res.status(500).json({ message: "Internal Server Error", error });
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
    console.log(">>> error-deleteComic", error);
    return res.status(500).json({ message: "Internal Server Error", error });
  }
};

export { saveComic, deleteComic, getAllComic };
