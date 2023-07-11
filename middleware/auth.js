const apiKey = "abcd1234";

const auth = (req, res, next) => {
  console.log(req.headers, apiKey, req.headers.api_key == apiKey);
  if (req.headers.api_key == apiKey) {
    next();
  }

  res.send("Sorry, bad API key!");
  //else do nothing
};

module.exports = auth;
