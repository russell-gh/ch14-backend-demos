const express = require("express");
const router = express.Router();
const asyncMySQL = require("../mysql/connection");
const {
  addUser,
  checkUserCreds,
  addToken,
  getTokenByBrowserEmail,
} = require("../mysql/queries");
const sha256 = require("sha256");
const { genRandomString } = require("../utils/math");
const chalk = require("chalk");
const sendEmail = require("../email/send");
const emailTemplates = require("../email/templates");

router.post("/login", async (req, res) => {
  console.log(req.ip);
  const { email, password } = req.body;

  //hash the password
  const sha256Password = sha256(password + "cohort14isgreat");

  //compare the hashed version to the stored one
  try {
    const results = await asyncMySQL(checkUserCreds(), [email, sha256Password]); //prepared statement#

    if (results.length === 1) {
      const token = genRandomString(128);

      const browserTempToken = genRandomString(128);
      const emailTempToken = genRandomString(128);

      asyncMySQL(
        addToken(results[0].id, token, browserTempToken, emailTempToken, req.ip)
      );

      res.send({ status: 1, browserTempToken });

      //email the email token
      sendEmail(
        emailTemplates.login().subject,
        emailTemplates.login(emailTempToken).htmlContent,
        [{ email }]
      );
    } else {
      res.send({ status: 0, reason: "Bad creds!" });
    }
  } catch (e) {
    console.log(e);
  }

  //tell the user all is ok
});

router.post("/loginComplete", async (req, res) => {
  const { browserTempToken, emailTempToken } = req.body;

  try {
    const results = await asyncMySQL(
      getTokenByBrowserEmail(browserTempToken, emailTempToken)
    );

    if (results.length === 1) {
      res.send({ status: 1, token: results[0].token });
    } else {
      res.send({ status: 0, reason: "One of more temp tokens are wrong!" });
    }
  } catch (e) {
    console.log(e);
  }
});

router.get("/validate", (req, res) => {
  res.send({ status: 1 });
});

router.post("/register", async (req, res) => {
  const { email, password } = req.body;

  //store the user in the database
  try {
    const sha256Password = sha256(password + "cohort14isgreat");

    const result = await asyncMySQL(addUser(email, sha256Password));
    res.send({ status: 1, userId: result.insertId });

    sendEmail(
      emailTemplates.register().subject,
      emailTemplates.register().htmlContent,
      [{ email }]
    );
  } catch (e) {
    console.log(e);
    res.send({ status: 0 });
  }
});

module.exports = router;
