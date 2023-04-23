const router = require("express").Router();
const { Users, Messages, Conversations } = require("../models/index");

//*** RENDERS HOME LOGIN PAGE */
router.get("/", async (req, res) => {
  res.render("index");
});

//*** CHECKS IF USER IS AUTHENTICATED */
function isAuthenticated(req, res, next) {
  console.log(req.session)
  if (!req.session.user_id) {
    return res.redirect("/");
  }
  next();
}

//*** IF AUTHENTICATED, RENDER DASHBOARD */
router.get("/dashboard", isAuthenticated, async (req, res) => {
  try {
        const conversations = await Conversations.findAll({
          // where: {
          //   users: req.session.user_id,
          // },
          raw: true,
        });
        const userBase = await Users.findAll({
          raw: true,
        });
        const user = await Users.findByPk(req.session.user_id);
        // const conversation = await Conversations.findByPk(conversationId, {
        //   include: ['messages'],
        // });

        res.render("private/dashboard", {
          username: user.username,
                    conversations,
                    userBase,
                    // conversation,
        })
      } catch (err) {
        console.log(err);
      }
});

module.exports = router;
