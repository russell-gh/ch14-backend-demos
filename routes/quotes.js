const express = require("express");
const router = express.Router();

//route
router.get("/", (req, res) => {
  console.log("Quotes route ran");
  const { character, num } = req.query;

  let _simpsons = [...req.simpsons];

  //if specific characters is asked for
  if (character) {
    _simpsons = _simpsons.filter((char) => {
      return char.character.toLowerCase().includes(character.toLowerCase());
    });
  }

  //if specific quantity is asked for
  if (num && Number(num) > 0 && _simpsons.length > num) {
    _simpsons.length = num;
  }

  res.send(_simpsons);
});

module.exports = router;
