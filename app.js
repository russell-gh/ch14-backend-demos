const dotenv = require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");
const asyncMySQL = require("./mysql/connection");
const checkToken = require("./middleware/auth");
const limiter = require("./middleware/limiter");
const chalk = require("chalk");
const helmet = require("helmet");

app.use(helmet());

app.use(limiter);

app.use(cors()); //just fixes it for now!!!

//convert the body to json
app.use(express.json());

app.use("/character", checkToken, require("./routes/character"));
app.use("/account", require("./routes/account"));

const port = process.env.PORT || 6001;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
