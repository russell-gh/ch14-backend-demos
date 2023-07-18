const express = require("express");
const app = express();

app.use((req, res, next) => {
  console.log("New Request!");
  next();
});

//convert the body to json
app.use(express.json());

app.use("/get", require("./routes/get"));
app.use("/delete", require("./routes/delete"));
app.use("/add", require("./routes/add"));
app.use("/update", require("./routes/update"));

const port = process.env.PORT || 6001;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
