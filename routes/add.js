const express = require("express");
const router = express.Router();
const { genRandomString } = require("../utils/math");
const asyncMySQL = require("../mysql/connection");

router.post("/character", async (req, res) => {
  const { character, characterDirection, quote } = req.body;

  //check the contents
  if (
    !character ||
    !characterDirection ||
    !quote ||
    typeof character !== "string" ||
    typeof characterDirection !== "string" ||
    typeof quote !== "string"
  ) {
    res.send({ status: 0, reason: "Incomplete or invalid request" });
    return;
  }

  try {
    await asyncMySQL(`INSERT INTO characters
                        (name, quote, direction)
                          VALUES
                            ("${character}", "${quote}", "${characterDirection}")`);
    res.send({ status: 1 });
  } catch (error) {
    res.send({ status: 0, reason: "Duplicate entry" });
  }
});

module.exports = router;
