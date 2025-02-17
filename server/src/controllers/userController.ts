import { Request, Response } from "express";
import {
  handleAddFeedback,
  handleFindUserByEmailAndTypeAccount,
  handleGetUserInfo,
  handleGetUserRankings,
  handleGetUserStatistical,
} from "../services/userService";
import { error_server } from "../lib/define";
import axios from "axios";
import { criterion, rawDataGetUserInfo } from "../lib/types";

export const getUserInfo = async (
  req: Request,
  res: Response
): Promise<any> => {
  try {
    const response = await handleGetUserInfo(req.query as rawDataGetUserInfo);

    return res.status(200).json(response);
  } catch (error) {
    console.log(error);
    return res.status(500).json(error_server);
  }
};

export const getUserStatistical = async (
  req: Request,
  res: Response
): Promise<any> => {
  try {
    const { userId } = req.query;

    if (!userId) {
      return res.status(500).json({
        status: "error",
        message: "User ID là bắt buộc!",
      });
    }

    const response = await handleGetUserStatistical(userId as string);

    return res.status(200).json(response);
  } catch (error) {
    console.log(error);
    return res.status(500).json(error_server);
  }
};

export const getUserRankings = async (
  req: Request,
  res: Response
): Promise<any> => {
  try {
    const { criterion } = req.query;

    if (!criterion) {
      return res.status(500).json({
        status: "error",
        message: "Tiêu chí là bắt buộc",
      });
    }

    const response = await handleGetUserRankings(criterion as criterion);

    console.log(">>> response", response);

    return res.status(200).json(response);
  } catch (error) {
    console.log(error);
    return res.status(500).json(error_server);
  }
};

export const findUserByEmailAndTypeAccount = async (
  req: Request,
  res: Response
): Promise<any> => {
  try {
    // const { email, typeAccount } = req.body;
    const { email, typeAccount } = req.query;

    console.log(">>> query", req.query);

    if (!email || !typeAccount) {
      return res.status(500).json({
        status: "error",
        message: "Email và typeAccount là bắt buộc",
      });
    }

    const response = await handleFindUserByEmailAndTypeAccount(
      email as string,
      typeAccount as string
    );

    return res.status(200).json(response);
  } catch (error) {
    console.log(error);
    return res.status(500).json(error_server);
  }
};

export const addFeedback = async (
  req: Request,
  res: Response
): Promise<any> => {
  try {
    const { userId, title, description } = req.body;

    if (!userId || !title || !description) {
      return res.status(500).json({
        message: "userId, title và description là bắt buộc",
      });
    }

    const response = await handleAddFeedback(req.body);

    return res.status(200).json(response);
  } catch (error) {
    console.log(error);
    return res.status(500).json(error_server);
  }
};

// =============================== MOMO ===============================
export const upgradeVipLevel = async (
  req: Request,
  res: Response
): Promise<any> => {
  try {
    //https://developers.momo.vn/#/docs/en/aiov2/?id=payment-method
    //parameters
    var accessKey = "F8BBA842ECF85";
    var secretKey = "K951B6PE1waDMi640xX08PD3vg6EkVlz";
    var orderInfo = "pay with MoMo";
    var partnerCode = "MOMO";
    var redirectUrl =
      "https://webhook.site/b3088a6a-2d17-4f8d-a383-71389a6c600b";
    var ipnUrl = "https://webhook.site/b3088a6a-2d17-4f8d-a383-71389a6c600b";
    var requestType = "payWithMethod";
    var amount = "50000";
    var orderId = partnerCode + new Date().getTime();
    var requestId = orderId;
    var extraData = "";
    var paymentCode =
      "T8Qii53fAXyUftPV3m9ysyRhEanUs9KlOPfHgpMR0ON50U10Bh+vZdpJU7VY4z+Z2y77fJHkoDc69scwwzLuW5MzeUKTwPo3ZMaB29imm6YulqnWfTkgzqRaion+EuD7FN9wZ4aXE1+mRt0gHsU193y+yxtRgpmY7SDMU9hCKoQtYyHsfFR5FUAOAKMdw2fzQqpToei3rnaYvZuYaxolprm9+/+WIETnPUDlxCYOiw7vPeaaYQQH0BF0TxyU3zu36ODx980rJvPAgtJzH1gUrlxcSS1HQeQ9ZaVM1eOK/jl8KJm6ijOwErHGbgf/hVymUQG65rHU2MWz9U8QUjvDWA==";
    var orderGroupId = "";
    var autoCapture = true;
    var lang = "vi";

    //before sign HMAC SHA256 with format
    //accessKey=$accessKey&amount=$amount&extraData=$extraData&ipnUrl=$ipnUrl&orderId=$orderId&orderInfo=$orderInfo&partnerCode=$partnerCode&redirectUrl=$redirectUrl&requestId=$requestId&requestType=$requestType
    var rawSignature =
      "accessKey=" +
      accessKey +
      "&amount=" +
      amount +
      "&extraData=" +
      extraData +
      "&ipnUrl=" +
      ipnUrl +
      "&orderId=" +
      orderId +
      "&orderInfo=" +
      orderInfo +
      "&partnerCode=" +
      partnerCode +
      "&redirectUrl=" +
      redirectUrl +
      "&requestId=" +
      requestId +
      "&requestType=" +
      requestType;
    //puts raw signature
    console.log("--------------------RAW SIGNATURE----------------");
    console.log(rawSignature);
    //signature
    const crypto = require("crypto");
    var signature = crypto
      .createHmac("sha256", secretKey)
      .update(rawSignature)
      .digest("hex");
    console.log("--------------------SIGNATURE----------------");
    console.log(signature);

    //json object send to MoMo endpoint
    const requestBody = JSON.stringify({
      partnerCode: partnerCode,
      partnerName: "Test",
      storeId: "MomoTestStore",
      requestId: requestId,
      amount: amount,
      orderId: orderId,
      orderInfo: orderInfo,
      redirectUrl: redirectUrl,
      ipnUrl: ipnUrl,
      lang: lang,
      requestType: requestType,
      autoCapture: autoCapture,
      extraData: extraData,
      orderGroupId: orderGroupId,
      signature: signature,
    });

    // option for axios
    const options = {
      method: "POST",
      url: "https://test-payment.momo.vn/v2/gateway/api/create",
      headers: {
        "Content-Type": "application/json",
        "Content-Length": Buffer.byteLength(requestBody),
      },
      data: requestBody,
    };

    let result;
    try {
      result = await axios(options);
      return res.status(200).json(result.data);
    } catch (error) {
      console.log("lỗi rồi");
      console.log(error);
    }

    // const response = await handleUpgradeVipLevel(req.body);

    // return res.status(200).json(response);
  } catch (error) {
    console.log(error);
    return res.status(500).json(error_server);
  }
};
