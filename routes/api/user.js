const mongoose = require("mongoose");
const passport = require("passport");
const router = require("express").Router();
const auth = require("../auth");
const verifyjwt = require("../middleware/verifyToken");
const User = mongoose.model("user");

//POST new user route (optional, everyone has access)
router.post("/register", auth.optional, async (req, res, next) => {
  try {
    const user = req.body;
    if (!user.email) {
      return res.send({
        errors: {
          email: "is required",
        },
      });
    }

    if (!user.password) {
      return res.send({
        errors: {
          password: "is required",
        },
      });
    }

    const finalUser = new User(user);

    finalUser.setPassword(user.password);

    const result = await finalUser.save();
    return res.send({ user: result });
  } catch (error) {
    return res.status(400).send({
      message: JSON.stringify(error),
    });
  }
});

//POST login route (optional, everyone has access)
router.post("/login", auth.optional, (req, res, next) => {
  const user = { email: req.body.email, password: req.body.password };
  console.log("user ", user);
  if (!user.email) {
    return res.send({
      errors: {
        email: "is required",
      },
    });
  }

  if (!user.password) {
    return res.send({
      errors: {
        password: "is required",
      },
    });
  }

  return passport.authenticate("local", { session: false }, (err, user, info) => {
    if (err) {
      return next(err);
    }
    if (user) {
      return res.send({ user: user.toAuthJSON() });
    }
    return res.status(400).send(info);
  })(req, res, next);
});

//GET current route (required, only authenticated users have access)
router.get("/current", auth.required, verifyjwt, (req, res, next) => {
  console.log("id", req.user.id);
  return User.findById(req.user.id).then((user) => {
    if (!user) {
      return res.sendStatus(400);
    }

    return res.json({ user });
  });
});
router.get("/all", auth.required, (req, res, next) => {
  return User.find({}).then((users) => {
    if (!users) {
      return res.sendStatus(400);
    }

    return res.json({ users });
  });
});
module.exports = router;
