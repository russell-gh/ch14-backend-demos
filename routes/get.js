const express = require("express");
const router = express.Router();
const asyncMySQL = require("../mysql/connection");
const e = require("express");

router.get("/characters", async (req, res) => {
  const results = await asyncMySQL(`SELECT name, quote, direction, image
                                      FROM characters;`);

  res.send({ status: 1, results });
});

router.get("/character/:id", async (req, res) => {
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
