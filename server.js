const express = require("express");
const app = express();
const simpsons = require("./simpsons.json");
const logging = require("./middleware/logging");
const auth = require("./middleware/auth");

simpsons.forEach((char, index) => {
  char.id = index + 1;
});

//handle static file middleware
app.use(express.static("public"));

app.use((req, res, next) => {
  req.simpsons = simpsons;
  next();
});

//convert the body to json
app.use(express.json());

//logging middlware
app.use(logging);

//api key validation middleware
// app.use(auth); //only enable if you add a header key

//route middleware
app.use("/quotes", require("./routes/quotes"));
app.use("/", require("./routes/demo"));

const port = process.env.PORT || 6001;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
