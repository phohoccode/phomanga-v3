import connection from "../database/mysql";
import { error_server } from "../lib/define";
import { v4 as uuidv4 } from "uuid";
import { criterion, rawDataGetUserInfo } from "../lib/types";
import SavedComic from "../models/SavedComic";
import ViewedComic from "../models/ViewedHistory";

export const handleGetUserInfo = async (rawData: rawDataGetUserInfo) => {
  const { email, typeAccount, userId } = rawData;

  try {
    const sql_select = `
      Select 
        users.id as user_id,
        users.name as username,
        users.email,
        users.avatar,
        users.created_at, 
        users.type_account,
        roles.name as role_name, 
        vip_levels.level as vip_level,
        vip_levels.max_stories as max_stories
      from users, roles, vip_levels 
      where ${userId ? `users.id = '${userId}'` : `users.email = '${email}'`}
      ${typeAccount ? `and users.type_account = '${typeAccount}'` : ""}
      and users.role_id = roles.id
      and users.vip_level_id = vip_levels.id
    `;
    const [rows]: any = await connection.promise().query(sql_select);

    if (rows?.length === 0) {
      return {
        status: "error",
        error_code: "user_not_found",
        message: "Không tìm thấy người dùng!",
      };
    }

    return {
      status: "success",
      message: "Lấy thông tin người dùng thành công!",
      user: rows?.[0],
    };
  } catch (error) {
    console.log(error);
    return error_server;
  }
};

export const handleGetUserStatistical = async (userId: string) => {
  try {
    const sql_select = `
        Select count(*) as total_comments from comments where user_id = '${userId}' 
    `;

    const [rows]: any = await connection.promise().query(sql_select);

    const savedComic = await SavedComic.find({ userId });
    const viewdComic = await ViewedComic.find({ userId });

    return {
      status: "success",
      message: "Lấy thông tin thống kê người dùng thành công!",
      statistical: {
        total_comments: rows?.[0]?.total_comments,
        total_saved_comic: savedComic?.[0]?.comics?.length,
        total_viewed_comic: viewdComic?.[0]?.comics?.length,
      },
    };
  } catch (error) {
    console.log(error);
    return error_server;
  }
};

export const handleGetUserRankings = async (criterion: criterion) => {
  try {
    let sql_select = "";
    let rows: any = [];
    const quantity = 10;

    switch (criterion) {
      case "vip_level":
        sql_select = `
          Select
            users.id as user_id,
            users.name as username,
            users.avatar,
            vip_levels.level as vip_level
          from users, vip_levels
          where users.vip_level_id = vip_levels.id
          order by vip_levels.level desc
          limit ${quantity}
        `;

        [rows] = await connection.promise().query(sql_select);
        break;

      case "comment_wrote":
        sql_select = `
          Select
            users.id as user_id,
            users.name as username,
            users.avatar,
            count(comments.id) as quantity
          from users, comments
          where users.id = comments.user_id
          group by users.id, users.name, users.avatar
          order by quantity desc
          limit ${quantity}
        `;

        [rows] = await connection.promise().query(sql_select);
        break;

      case "saved_comic":
      case "number_of_stories_read":
        if (criterion === "saved_comic") {
          rows = await SavedComic.find();
        } else if (criterion === "number_of_stories_read") {
          rows = await ViewedComic.find();
        }

        rows = rows
          .sort((a: any, b: any) => b.comics.length - a.comics.length)
          .slice(0, quantity)
          .map((item: any) => {
            return {
              user_id: item.userId,
              username: item.username,
              avatar: item.avatar,
              quantity: item.comics?.length,
            };
          });

        break;

      default:
        return {
          status: "error",
          message: "Tiêu chí không hợp lệ!",
        };
    }

    return {
      status: "success",
      message: "Lấy bảng xếp hạng người dùng thành công!",
      data: {
        criterion,
        users: rows,
      },
    };
  } catch (error) {
    console.log(error);
    return error_server;
  }
};

export const handleAddFeedback = async (rawData: any) => {
  const { userId, title, description } = rawData;

  try {
    const sql_insert = `
      Insert into user_feedback (id, user_id, title, description)
      values ('${uuidv4()}', '${userId}', '${title}', '${description}')
    `;

    const response: any = await connection.promise().query(sql_insert);

    if (response?.[0]?.affectedRows === 0) {
      return {
        status: "error",
        message: "Gửi phản hồi thất bại!",
      };
    }

    return {
      status: "success",
      message: "Gửi phản hồi thành công!",
    };
  } catch (error) {
    console.log(error);
    return error_server;
  }
};

export const handleUpgradeVipLevel = async (userId: string) => {
  try {
    const sql_select = `
      Select vip_level_id from users where id = '${userId}'
    `;

    const [rows]: any = await connection.promise().query(sql_select);

    const vipLevelId = rows?.[0]?.vip_level_id;

    if (vipLevelId === 3) {
      return {
        status: "error",
        message: "Người dùng đã đạt cấp độ VIP cao nhất!",
      };
    }

    const sql_update = `
      Update users
      set vip_level_id = '${vipLevelId + 1}'
      where id = '${userId}'
    `;

    const response: any = await connection.promise().query(sql_update);

    if (response?.[0]?.affectedRows === 0) {
      return {
        status: "error",
        message: "Nâng cấp cấp độ VIP thất bại!",
      };
    }

    return {
      status: "success",
      message: "Nâng cấp cấp độ VIP thành công!",
    };
  } catch (error) {
    console.log(error);
    return error_server;
  }
};
