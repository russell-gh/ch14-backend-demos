const express = require("express");
const router = express.Router();
const asyncMySQL = require("../mysql/connection");
const { addUser, checkUserCreds, addToken } = require("../mysql/queries");
const sha256 = require("sha256");
const { genRandomString } = require("../utils/math");

router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  //hash the password
  const sha256Password = sha256(password + "cohort14isgreat");

  //compare the hashed version to the stored one
  try {
    const results = await asyncMySQL(checkUserCreds(email, sha256Password));

    if (results.length > 0) {
      const token = genRandomString(128);

      asyncMySQL(addToken(results[0].id, token));

      res.send({ status: 1, token });
    } else {
      res.send({ status: 0, reason: "Bad creds!" });
    }
  } catch (e) {
    console.log(e);
  }

  //tell the user all is ok
});

router.post("/register", async (req, res) => {
  const { email, password } = req.body;

  //store the user in the database
  try {
    const sha256Password = sha256(password + "cohort14isgreat");

    const result = await asyncMySQL(addUser(email, sha256Password));
    res.send({ status: 1, userId: result.insertId });
  } catch (e) {
    console.log(e);
    res.send({ status: 0 });
  }
});

module.exports = router;
