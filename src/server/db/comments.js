const db = require("./client");

const createComment = async ({ id, parentId, username, userId, body }) => {
  try {
    const {
      rows: [comment],
    } = await db.query(
      `
        INSERT INTO comments(id, parentId, username, userId, parentId, body)
        VALUES($1,$2,$3,$4,$5,$6)
        RETURNING *
        `,
      [id, parentId, username, userId, body]
    );
    return comment;
  } catch (error) {
    throw error;
  }
};

const getCommentsByParentId = async (parentId) => {
  try {
    const query = `
    SELECT *
    FROM comments
    WHERE parentId = $1;
    `;
    const { rows } = await db.query(query, [parentId]);
    return rows;
  } catch (error) {
    throw error;
  }
};

const updateComment = async (parentId, body) => {
  try {
    const query = `s
    UPDATE comments
    SET body = $1
    WHERE id = $2
    RETURNING *;
    `;
    const values = [body, parentId];
    const { rows } = await db.query(query, values);
    return rows[0];
  } catch (error) {
    throw error;
  }
};

const deleteComment = async (parentId) => {
  try {
    const query = `
    DELETE FROM comments
    WHERE id =$1;
    `;
    await db.query(query, [parentId]);
  } catch (error) {
    throw error;
  }
};

module.exports = {
  createComment,
  getCommentsByParentId,
  updateComment,
  deleteComment,
};
