const logging = (req, res, next) => {
  //do some work
  console.log(new Date(), req.path);
  next();
};

module.exports = logging;
