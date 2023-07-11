const express = require("express");
const router = express.Router();

router.get("/book/:bookId/:sortBy", (req, res) => {
  console.log("The book route ran", req.params.bookId);
  res.send(
    `Hi from the book route, you asked for book id ${req.params.bookId}`
  );
});

module.exports = router;
