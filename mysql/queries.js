module.exports = {
  addUser: (email, password) => {
    return `INSERT INTO users
                  (email, password)
                      VALUES
                          ("${email}", "${password}")`;
  },
};
