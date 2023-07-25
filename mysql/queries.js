module.exports = {
  addUser: (email, password) => {
    return `INSERT INTO users
                  (email, password)
                      VALUES
                          ("${email}", "${password}")`;
  },
  deleteCharacter: (id) => {
    return `DELETE FROM characters
              WHERE id LIKE ${id};`;
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
  getById: (id) => {
    return `SELECT name, quote, direction, image
                                      FROM characters
                                        WHERE user_id LIKE ${id};`;
  },

  updateCharacter: (key, value, id) => {
    return `UPDATE characters SET ${key} = "${value}"
                        WHERE id LIKE "${id}";`;
  },

  checkUserCreds: (email, sha256Password) => {
    return `SELECT id FROM users
              WHERE email LIKE "${email}"
                AND password LIKE "${sha256Password}";`;
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
