//*** CHECKS IF USER IS AUTHENTICATED */
function isAuthenticated(req, res, next) {
  if (!req.session.user_id) {
    return res.redirect("/");
  }
  next();
}

module.exports = isAuthenticated;