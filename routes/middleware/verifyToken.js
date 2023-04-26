const jwt = require("jsonwebtoken");
function verifyjwt(req, res, next) {
  const authorization = req.headers["authorization"];
  let token = "";
  if (authorization && authorization.split(" ")[0] === "Bearer") {
    token = authorization.split(" ")[1];
  }

  if (!token) return res.status(401).json("Unauthorize user");

  try {
    const decoded = jwt.verify(token, "secret");
    req.user = decoded;
    console.log("decoded", { decoded });
    next();
  } catch (e) {
    console.log("token", token);
    res.status(400).json(e);
  }
}

module.exports = verifyjwt;
