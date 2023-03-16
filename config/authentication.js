const jwt = require("jsonwebtoken");
const User = require("../models/user.model");

const authenticate = async (req, res, next) => {
  try {
    let token;

    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith("Bearer")
    ) {
      token = req.headers.authorization.split(" ")[1];

      // decodes token id
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      if (decoded == undefined) {
        res.status(401).json({ message: "Unauthorized" });
      } else {
        req.user = await User.findById(decoded.id).select("-password"); //using the decoded id's all the data without password

        next();
      }
    } else {
      res.status(401).json({ message: "Unauthorized, Token not found" });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

module.exports = { authenticate };
