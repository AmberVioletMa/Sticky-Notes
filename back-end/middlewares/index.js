module.exports.errorHandler = (err, req, res, _next) => {
  if (err) {
    res.status(err.status || 500);
    res.send({ message: err.message ? err.message : 'There was an error on the server' });
  }
};
module.exports.accessControl = (req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Authorization, Content-Type, Accept, AuthorizationRefresh");
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,PATCH,OPTIONS');
    res.header('Access-Control-Allow-Credentials', 'true');
    next();
};