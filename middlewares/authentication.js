const isLoggedIn = (req, res, next) => {
  if (req.session && req.session.user) {
    return next();
  }
  res.redirect("/auth/login");
};
module.exports = isLoggedIn;
