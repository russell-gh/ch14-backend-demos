const express = require("express");
const router = express.Router();
const asyncMySQL = require("../mysql/connection");
const {
  deleteCharacter,
  addCharacter,
  getById,
  updateCharacter,
} = require("../mysql/queries");

router.delete("/:id", async (req, res) => {
  const id = Number(req.params.id);

  //check that id is a number
  if (Number.isNaN(id)) {
    res.send({ status: 0, reason: "Invalid id" });
    return;
  }

  const result = await asyncMySQL(deleteCharacter(id, req.validatedUserId));

  if (result.affectedRows > 0) {
    res.send({ status: 1 });
  } else {
    res.send({ status: 0, reason: "Delete failed" });
  }
});

router.post("/", async (req, res) => {
  //adding
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
    await asyncMySQL(
      addCharacter(character, quote, characterDirection, req.validatedUserId)
    );
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
      await asyncMySQL(
        updateCharacter("name", character, id, req.validatedUserId)
      );
    }
    if (quote && typeof quote === "string") {
      await asyncMySQL(
        updateCharacter("quote", quote, id, req.validatedUserId)
      );
    }
    if (allowableDirections.includes(characterDirection)) {
      await asyncMySQL(
        updateCharacter(
          "direction",
          characterDirection,
          id,
          req.validatedUserId
        )
      );
    }
  } catch (error) {
    res.send({ status: 0, reason: error.sqlMessage });
  }
  res.send({ status: 1 });
});

router.get("/:order", async (req, res) => {
  // const orderParams = ["ASC", "DESC"];
  // if (!orderParams.includes(req.params.order)) {
  //   res.send("Hacker!");
  // }

  let order = "";
  if (req.params.order === "ASC") {
    order = "ASC";
  }
  if (req.params.order === "DESC") {
    order = "DESC";
  }

  //ask sql for the data
  const results = await asyncMySQL(getById(order), [req.validatedUserId]);

  console.log(getById(req.params.order));

  if (results.length > 0) {
    res.send({ status: 1, results });
    return;
  }

  res.send({ status: 0, reason: "ID not found" });
});

module.exports = router;
