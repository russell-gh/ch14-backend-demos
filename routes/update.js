const express = require("express");
const router = express.Router();

router.patch("/character/:id", (req, res) => {
  const allowableDirections = ["Left", "Right"];

  const id = Number(req.params.id);

  //check that id is a number
  if (Number.isNaN(id)) {
    res.send({ status: 0, reason: "Invalid id" });
    return;
  }

  const indexOf = req.simpsons.findIndex((item) => {
    return item.id === id;
  });

  //check that user exists
  if (indexOf === -1) {
    res.send({ status: 0, reason: "Id not found" });
    return;
  }

  const { character, characterDirection, quote } = req.body;

  //for security we have repitition
  if (character && typeof character === "string") {
    req.simpsons[indexOf].character = character;
  }
  if (quote && typeof quote === "string") {
    req.simpsons[indexOf].quote = quote;
  }
  if (allowableDirections.includes(characterDirection)) {
    req.simpsons[indexOf].characterDirection = characterDirection;
  }

  res.send({ status: 1 });
});

module.exports = router;
