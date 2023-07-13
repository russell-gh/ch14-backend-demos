const express = require("express");
const router = express.Router();
const { genRandomString } = require("../utils/math");

router.post("/character", (req, res) => {
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

  //check for duplicates
  const indexOf = req.simpsons.findIndex((item) => {
    return item.character === character || item.quote === quote;
  });

  if (indexOf > -1) {
    res.send({ status: 0, reason: "Duplicate entry" });
    return;
  }

  req.simpsons.push({
    id: genRandomString(16), //TBD
    character,
    characterDirection,
    quote,
  });

  res.send({ status: 1 });
});

module.exports = router;
