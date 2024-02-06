// const passport = require("passport");
const User = require("../models/user.model.js");
const wrapAsync = require("../utils/wrapAsync");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const registerUser = wrapAsync(async (req, res) => {
  try {
    let { name, password, email } = req.body;
    console.log(name);
    let user = await User.findOne({ email });
    if (user) {
      return res.status(200).json({
        message: "user already exists",
      });
    }
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hashSync(password, salt);
    const name_ = name.split(" ")[0];
    userPhoto = `https://ui-avatars.com/api/?name=${name_}&background=29335C&size=128&color=fff&format=png&length=1`;
    const newUser = new User({
      name,
      email,
      password: hashedPassword,
      userPhoto,
    });
    const registeredUser = await newUser.save();
    const { password: password_, ...info } = registeredUser._doc;
    res.status(200).json({
      user: info,
      message: "register success",
    });
  } catch (error) {
    console.log(error);
    res.status(400).json({
      message: "register failed",
      error: error.message,
    });
  }
});

const loginUser = wrapAsync(async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(200).json({
        message: "user not found",
      });
    }
    const matchPassword = await bcrypt.compareSync(password, user.password);
    if (!matchPassword) {
      return res.status(200).json({ message: "Invalid Credentials" });
    }
    const token = jwt.sign(
      {
        id: user._id,
        username: user.username,
        email: user.email,
        userPhoto: user.userPhoto,
        skills: user.skills,
        links: user.links,
        dataFilled: user.dataFilled,
      },
      process.env.SECRET,
      {
        expiresIn: "14d",
      }
    );
    const { password: UserPassword, ...info } = user._doc;
    res
      .cookie("token", token, { sameSite: "None", secure: true })
      .status(200)
      .json({ user: info, message: "login success" });
  } catch (error) {
    res.status(500).json({ message: "login failed", error: error.message });
  }
});

const logoutUser = wrapAsync((req, res) => {
  try {
    res
      .clearCookie("token", { sameSite: "None", secure: true })
      .status(200)
      .json({ message: "logout success" });
  } catch (error) {
    res.status(500).json({
      message: "logout failed",
      error: error.message,
    });
  }
});

const getUser = wrapAsync(async (req, res) => {
  const token = req.cookies.token;
  jwt.verify(token, process.env.SECRET, {}, async (err, data) => {
    if (err) {
      return res.status(404).json({
        message: "get user failed",
        error: err.message,
      });
    }
    res.status(200).json(data);
  });
});

const updateUser = wrapAsync(async (req, res) => {
  // res.send("update user");
  try {
    const { name, email, skills, links, resume, interest, userId } = req.body;

    // Check if the user exists
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }
    // Update user information
    if (name) user.name = name;
    if (email) user.email = email;
    if (skills) user.skills = skills;
    if (links) user.links = links;
    if (resume) user.resume = resume;
    if (interest) user.interest = interest;
    user.dataFilled = true;

    // Save the updated user
    const updatedUser = await user.save();

    // Remove sensitive information from the response
    const { password: UserPassword, ...info } = updatedUser._doc;

    res.status(200).json({
      user: info,
      message: "User updated successfully",
    });
  } catch (error) {
    console.log(error);
    res.status(400).json({
      message: "Update failed",
      error: error.message,
    });
  }
});

module.exports = {
  registerUser,
  loginUser,
  logoutUser,
  getUser,
  updateUser,
};
