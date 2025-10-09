var jwt = require("jsonwebtoken");
const jwtVerifecation = (req, res, next) => {
  try {
    const accessToken = req.headers.authorization;

    jwt.verify(accessToken, "mern2404", function (err, decoded) {
      if (err) {
        res.send(err.message);
      } else {
        next();
      }
    });
  } catch (err) {
    console.log(err);
  }
};

module.exports = jwtVerifecation;
