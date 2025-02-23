import { Request, Response } from "express";
import {
  handleDeleteAllComic,
  handleDeleteComic,
  handleGetAllComic,
  handleSaveComic,
} from "../services/comicService";
import { error_server } from "../lib/define";
import {
  rawDataDeleteAllComic,
  rawDataDeleteComic,
  rawDataGetComic,
} from "../lib/types";

const getAllComic = async (req: Request, res: Response): Promise<any> => {
  try {
    const { userId, page, type } = req.query;

    if (!userId || !page || !type) {
      return res.status(500).json({
        status: "error",
        message: "User ID, Page and Type are required!",
      });
    }

    const response = await handleGetAllComic(req.query as rawDataGetComic);

    return res.status(200).json(response);
  } catch (error) {
    console.log(error);
    return res.status(500).json(error_server);
  }
};

const saveComic = async (req: Request, res: Response): Promise<any> => {
  try {
    const { dataComic, userId, username, avatar } = req.body;

    if (!dataComic || !userId || !username || !avatar) {
      return res.status(500).json({
        status: "error",
        message: "DataComic, User ID, Username and Avatar are required!",
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
    const { comicSlug, userId } = req.query;

    if (!comicSlug || !userId) {
      return res.status(500).json({
        status: "error",
        message: "ComicSlug and User ID are required!",
      });
    }

    const response = await handleDeleteComic(req.query as rawDataDeleteComic);

    return res.status(200).json(response);
  } catch (error) {
    console.log(error);
    return res.status(500).json(error_server);
  }
};

const deleteAllComic = async (req: Request, res: Response): Promise<any> => {
  try {
    const { userId, type } = req.query;

    if (!userId || !type) {
      return res.status(500).json({
        status: "error",
        message: "User ID and type are required!",
      });
    }

    const response = await handleDeleteAllComic(
      req.query as rawDataDeleteAllComic
    );

    return res.status(200).json(response);
  } catch (error) {
    console.log(error);
    return res.status(500).json(error_server);
  }
};

export { saveComic, deleteComic, getAllComic, deleteAllComic };
