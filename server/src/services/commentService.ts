import connection from "../database/mysql";
import { error_server } from "../lib/define";
import {
  rawDataCreateComment,
  rawDataDeleteComment,
  rawDataGetComments,
  rawDataLikeComment,
  rawDataUnlikeComment,
  rawDataUpdateComment,
} from "../lib/types";
import { v4 as uuidv4 } from "uuid";

export const handleGetComments = async (rawData: rawDataGetComments) => {
  const { comicSlug, limit, page, sort } = rawData;

  const offset = (parseInt(page) - 1) * parseInt(limit);

  try {
    const sql_select_by_page = `
      SELECT 
          c.id AS comment_id,
          c.content,
          c.user_id,
          c.chapter,
          c.is_spam,
          c.created_at,
          r.name AS role_name,
          u.avatar AS user_avatar,
          u.name AS user_name,
          v.nickname AS nickname,
          v.level as vip_level,
          COUNT(l.id) AS like_count,
          GROUP_CONCAT(DISTINCT CONCAT(l.user_id, ';', u_liker.name, ';', u.avatar)) AS liked_by_users
      FROM comments c
      JOIN users u ON c.user_id = u.id
      JOIN roles r ON u.role_id = r.id
      JOIN vip_levels v ON u.vip_level_id = v.id
      LEFT JOIN likes l ON c.id = l.comment_id
      LEFT JOIN users u_liker ON l.user_id = u_liker.id
      WHERE c.comic_slug = '${comicSlug}' and c.is_deleted = 0
      GROUP BY c.id, c.content, c.created_at, u.name, c.user_id
      ORDER BY c.created_at ${sort}
      LIMIT ${limit} OFFSET ${offset};
    `;

    const sql_select_total = `
      Select count(*) as total from comments
      where comic_slug = '${comicSlug}' and is_deleted = 0
    `;

    const [rows]: any = await connection.promise().query(sql_select_by_page);
    const [rows_total]: any = await connection
      .promise()
      .query(sql_select_total);

    const likedByUsers = rows.map((row: any) => {
      if (!row.liked_by_users) return [];
      const likedByUsers = row.liked_by_users?.split(",")?.map((item: any) => {
        const [userId, userName, avatar] = item.split(";");
        return { userId, userName, avatar };
      });
      return likedByUsers;
    });

    const finalData = rows.map((row: any, index: number) => {
      return {
        ...row,
        liked_by_users: likedByUsers[index],
      };
    });

    return {
      status: "success",
      message: "Lấy thông tin bình luận thành công!",
      data: {
        items: finalData,
        totalItems: rows_total[0].total,
      },
    };
  } catch (error) {
    console.log(error);
    return error_server;
  }
};

export const handleCreateComment = async (rawData: rawDataCreateComment) => {
  try {
    const { userId, content, comicSlug, chapter, comicName } = rawData;

    const id = uuidv4();

    const sql_insert = `
      Insert into comments (id, user_id, content, comic_slug, chapter, comic_name)
      values (
        '${id}', '${userId}', '${content}',
        '${comicSlug}', '${chapter ?? ""}', '${comicName}'
      )
    `;

    const response: any = await connection.promise().query(sql_insert);

    if (response?.[0]?.affectedRows === 0) {
      return {
        status: "error",
        message: "Tạo bình luận thất bại!",
      };
    }

    return {
      status: "success",
      message: "Tạo bình luận thành công!",
    };
  } catch (error) {
    console.log(error);
    return error_server;
  }
};

export const handleDeleteComment = async (rawData: rawDataDeleteComment) => {
  const { commentId, userId } = rawData;

  try {
    const sql_delete = `
      UPDATE comments set is_deleted = 1
      where id = '${commentId}' and user_id = '${userId}'
    `;

    const response: any = await connection.promise().query(sql_delete);

    if (response?.[0]?.affectedRows === 0) {
      return {
        status: "error",
        message: "Xóa bình luận thất bại!",
      };
    }

    return {
      status: "success",
      message: "Xóa bình luận thành công!",
    };
  } catch (error) {
    console.log(error);
    return error_server;
  }
};

export const handleUpdateComment = async (rawData: rawDataUpdateComment) => {
  const { id, userId, content } = rawData;

  try {
    const sql_update = `
      Update comments 
      set content = '${content}'
      where id = '${id}' and user_id = '${userId}'
    `;

    const response: any = await connection.promise().query(sql_update);

    if (response?.[0]?.affectedRows === 0) {
      return {
        status: "error",
        message: "Cập nhật bình luận thất bại!",
      };
    }

    return {
      status: "success",
      message: "Cập nhật bình luận thành công!",
    };
  } catch (error) {
    console.log(error);
    return error_server;
  }
};

export const handleLikeComment = async (rawData: rawDataLikeComment) => {
  try {
    const { commentId, userId } = rawData;

    const id = uuidv4();

    const sql_like_comment = `
      Insert into likes (id, comment_id, user_id)
      values ('${id}', '${commentId}', '${userId}')
    `;

    const response: any = await connection.promise().query(sql_like_comment);

    if (response?.[0]?.affectedRows === 0) {
      return {
        status: "error",
        message: "like comment failed",
      };
    }

    return {
      status: "success",
      message: "like comment",
    };
  } catch (error) {
    console.log(error);
    return error_server;
  }
};

export const handleUnlikeComment = async (rawData: rawDataUnlikeComment) => {
  try {
    const { commentId, userId } = rawData;

    const sql_dislike_comment = `
      Delete from likes
      where comment_id = '${commentId}' and user_id = '${userId}'
    `;
    const response: any = await connection.promise().query(sql_dislike_comment);

    if (response?.[0]?.affectedRows === 0) {
      return {
        status: "error",
        message: "dislike comment failed",
      };
    }

    return {
      status: "success",
      message: "dislike comment",
    };
  } catch (error) {
    console.log(error);
    return error_server;
  }
};
