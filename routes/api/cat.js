const mongoose = require("mongoose");
const passport = require("passport");
const router = require("express").Router();
const auth = require("../auth");
const Cat = mongoose.model("cat");

//POST new user route (optional, everyone has access)
router.post("/", auth.optional, (req, res, next) => {
  console.log("req.body ", req.body);
  const cat = req.body;
  if (!cat.name || !cat.age) {
    return res.send({
      errors: {
        name: "is required",
        age: "is required",
      },
    });
  }

  const data = new Cat({ name: cat.name, age: cat.age });

  return data.save().then(() => res.send({ cat: data }));
});
router.get("/all", auth.required, (req, res, next) => {
  return Cat.find({}).then((cats) => {
    if (!cats) {
      return res.sendStatus(400);
    }

    return res.json({ cats });
  });
});
//GET current route (required, only authenticated users have access)
router.get("/:id", (req, res, next) => {
  const {
    params: { id },
  } = req;
  console.log("id", req.params.id);
  return Cat.findById(id).then((cat) => {
    if (!cat) {
      return res.sendStatus(400);
    }

    return res.json(cat);
  });
});

module.exports = router;
