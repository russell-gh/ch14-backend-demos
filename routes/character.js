const express = require("express");
const router = express.Router();
const { genRandomString } = require("../utils/math");
const asyncMySQL = require("../mysql/connection");

router.delete("/:id", async (req, res) => {
  const id = Number(req.params.id);

  //check that id is a number
  if (Number.isNaN(id)) {
    res.send({ status: 0, reason: "Invalid id" });
    return;
  }

  await asyncMySQL(`DELETE FROM characters
                                      WHERE id LIKE ${id};`);

  res.send({ status: 1 });
});

router.post("/", async (req, res) => {
  //adding
  const { character, characterDirection, quote, userId } = req.body;

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
                        (name, quote, direction, user_id)
                          VALUES
                            ("${character}", 
                             "${quote}", 
                             "${characterDirection}", 
                             "${userId}")`);
    res.send({ status: 1 });
  } catch (error) {
    console.log(error);
    res.send({ status: 0, reason: "Duplicate entry" });
  }
});

router.patch("/:id", async (req, res) => {
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

router.get("/:id", async (req, res) => {
  const id = Number(req.params.id);

  //check that id is a number
  if (Number.isNaN(id)) {
    res.send({ status: 0, reason: "Invalid id" });
    return;
  }

  //ask sql for the data
  const results = await asyncMySQL(`SELECT name, quote, direction, image
                                      FROM characters
                                        WHERE id LIKE ${id};`);

  if (results.length > 0) {
    res.send({ status: 1, results });
    return;
  }

  res.send({ status: 0, reason: "ID not found" });
});

module.exports = router;
