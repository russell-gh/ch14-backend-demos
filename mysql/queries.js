module.exports = {
  addUser: (email, password) => {
    return `INSERT INTO users
                  (email, password)
                      VALUES
                          ("${email}", "${password}")`;
  },
  deleteCharacter: (id, userId) => {
    return `DELETE FROM characters
              WHERE id LIKE ${id} AND user_id LIKE ${userId};`;
  },

  addCharacter: (character, quote, characterDirection, userId) => {
    return `INSERT INTO characters
                        (name, quote, direction, user_id)
                          VALUES
                            ("${character}", 
                             "${quote}", 
                             "${characterDirection}", 
                             "${userId}")`;
  },
  getById: (order) => {
    return `SELECT name, quote, direction, image
                                      FROM characters
                                        WHERE user_id LIKE ?
                                          ORDER BY name ${order};`;
  },

  updateCharacter: (key, value, id, userId) => {
    return `UPDATE characters SET ${key} = "${value}"
                        WHERE id LIKE "${id}"
                          AND user_id LIKE "${userId}";`;
  },

  checkUserCreds: () => {
    return `SELECT id FROM users
              WHERE email = ?
                AND password = ?;`;
  },

  addToken: (userId, token) => {
    return `INSERT INTO tokens
              (user_id, token)
                VALUES
                  ("${userId}", "${token}")`;
  },

  getIdByToken: (token) => {
    return `SELECT user_id FROM tokens
              WHERE token LIKE "${token}";`;
  },
};
