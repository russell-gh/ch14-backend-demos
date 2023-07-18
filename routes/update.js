const express = require("express");
const router = express.Router();
const asyncMySQL = require("../mysql/connection");

router.patch("/character/:id", async (req, res) => {
  const allowableDirections = ["Left", "Right"];

  const id = Number(req.params.id);

  //check that id is a number
  if (Number.isNaN(id)) {
    res.send({ status: 0, reason: "Invalid id" });
    return;
  }

  const { character, characterDirection, quote } = req.body;

  try {
    //for security we have repitition
    if (character && typeof character === "string") {
      await asyncMySQL(`UPDATE characters SET name = "${character}"
                        WHERE id LIKE "${id}";`);
    }
    if (quote && typeof quote === "string") {
      await asyncMySQL(`UPDATE characters SET quote = "${quote}"
                        WHERE id LIKE "${id}";`);
    }
    if (allowableDirections.includes(characterDirection)) {
      await asyncMySQL(`UPDATE characters SET direction = "${characterDirection}"
                        WHERE id LIKE "${id}";`);
    }
  } catch (error) {
    res.send({ status: 0, reason: error.sqlMessage });
  }
  res.send({ status: 1 });
});

module.exports = router;
