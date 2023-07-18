const express = require("express");
const router = express.Router();
const asyncMySQL = require("../mysql/connection");

router.delete("/character/:id", async (req, res) => {
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

module.exports = router;
