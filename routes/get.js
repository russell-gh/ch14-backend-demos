const express = require("express");
const router = express.Router();

router.get("/characters", (req, res) => {
  res.send({ status: 1, characters: req.simpsons });
});

router.get("/character/:id", (req, res) => {
  const id = Number(req.params.id);

  //check that id is a number
  if (Number.isNaN(id)) {
    res.send({ status: 0, reason: "Invalid id" });
    return;
  }

  //copy and find the specific character
  const _simpsons = [...req.simpsons];
  const character = _simpsons.find((char) => {
    return char.id === id;
  });

  //check that char exists
  if (!character) {
    res.send({ status: 0, reason: "Id not found" });
  }

  res.send({ status: 1, character });
});

module.exports = router;
