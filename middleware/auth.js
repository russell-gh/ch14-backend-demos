const { getIdByToken } = require("../mysql/queries");
const asyncMySQL = require("../mysql/connection");

const checkToken = async (req, res, next) => {
  const results = await asyncMySQL(getIdByToken(req.headers.token));

  console.log(results);

  if (results.length === 1) {
    //attach token id to the request
    req.validatedUserId = results[0].user_id;

    next();
    return;
  }

  res.send({ status: 0, reason: "Bad token" });
};

module.exports = checkToken;
