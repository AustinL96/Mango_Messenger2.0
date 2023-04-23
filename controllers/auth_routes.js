const router = require("express").Router();
const { Users } = require("../models");
const bcrypt = require("bcrypt");

//***LOGIN ROUTES */
router.post("/login", async (req, res) => {
  //user_data = {email, password}
  const user_data = req.body;
  // console.log(user_data);
  const user = await Users.findOne({
    raw: true,
    where: {
      email: user_data.email,
    },
  });
  //Should an account with no email exist, redirects them
  if (!user) return res.redirect("/");

  //Checks if the password matches, redirects them if not
  const valid_pass = bcrypt.compareSync(user_data.password, user.password);
  // console.log(valid_pass);
  if (!valid_pass) return res.redirect("/");

  //After success, store the id to session then redirect to the home dashboard
  req.session.user_id = user.user_id;
  // console.log(req.session)
  res.redirect("/dashboard");
});

//***REGISTER ROUTES */
router.post("/register", async (req, res) => {
  //user_data = {username, email, password}
  try {
    const newUser = await Users.create(req.body);
    req.session.user_id = newUser.user_id;
    res.redirect("/dashboard");
  } catch (err) {
    console.log(err);
    res.redirect("/");
  }
});

//***LOGOUT ROUTES */
router.get('/logout', (req, res) => {
  req.session.destroy();

  res.redirect('/');
})

module.exports = router;
