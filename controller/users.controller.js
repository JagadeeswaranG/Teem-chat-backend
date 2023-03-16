const generateToken = require("../config/generateToken");
const User = require("../models/user.model");

/*User SignUp*/
const userSignup = async (req, res) => {
  try {
    const { name, email, password, pic } = req.body;

    if (!name || !email || !password) {
      res.status(400);
      throw new Error("Please Enter all the Feilds");
    }

    const userExists = await User.findOne({ email });

    if (userExists) {
      return res.status(400).json({ message: "User already exists" });
      //   throw new Error("User already exists");
    }

    const user = await User.create({
      name,
      email,
      password,
      pic,
    });

    if (user) {
      res.status(201).json({
        _id: user._id,
        name: user.name,
        email: user.email,
        pic: user.pic,
        token: generateToken(user._id),
      });
    } else {
      return res.status(400).json({ message: "Failed to Create the User" });
      //   throw new Error("Failed to Create the User");
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal server error !" });
  }
};

/*User Login*/
const userLogin = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (user && (await user.matchPassword(password))) {
      res.json({
        _id: user._id,
        name: user.name,
        email: user.email,
        pic: user.pic,
        token: generateToken(user._id),
      });
    } else {
      return res.status(401).json({ message: "Invalid Email or Password" });
      // throw new Error("Invalid Email or Password");
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal server error !" });
  }
};

/*All Users Data*/
const allUsers = async (req, res) => {
  try {
    const keyword = req.query.search
      ? {
          $or: [
            { name: { $regex: req.query.search, $options: "i" } },
            { email: { $regex: req.query.search, $options: "i" } },
          ],
        }
      : {};

    const users = await User.find(keyword).find({ _id: { $ne: req.user._id } });
    res.send(users);
    
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal server error !" });
  }
};

module.exports = { userSignup, userLogin, allUsers };
