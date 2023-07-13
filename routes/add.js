const express = require("express");
const router = express.Router();

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
  const indexOf = req.simspons.findIndex((item) => {
    return (
      item.character === character ||
      item.characterDirection === characterDirection
    );
  });

  req.simpsons.push({
    id: Math.round(Math.random() * 10000000),
    character,
    characterDirection,
    quote,
  });

  res.send({ status: 1 });
});

module.exports = router;
