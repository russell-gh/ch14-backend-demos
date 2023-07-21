const express = require("express");
const app = express();
const cors = require("cors");

app.use(cors()); //just fixes it for now!!!

app.use((req, res, next) => {
  console.log("New Request!");
  next();
});

//convert the body to json
app.use(express.json());

app.use("/character", require("./routes/character"));
app.use("/user", require("./routes/user"));

const port = process.env.PORT || 6001;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
