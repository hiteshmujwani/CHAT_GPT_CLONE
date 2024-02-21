import { hashPassword, matchPassword } from "../helpers/authHelper.js";
import Jwt from "jsonwebtoken";
import userModel from "../model/user.model.js";

//NEW USER REGISTRATION CONTROLLER

export const userRegisterController = async (req, res) => {
  try {
    const { username, email, password } = req.body;
    console.log(req.body);
    //checking already a user
    const existing = await userModel.findOne({ email });
    if (existing) {
      res.status(403).send({
        success: true,
        message: "Email is Already Registered",
      });
      return;
    }

    //username availiable or not
    const usernameTaken = await userModel.findOne({ username });
    if (usernameTaken) {
      res.status(403).send({
        success: true,
        message: "Username is Already Taken",
      });
      return;
    }

    //hashing user password for security
    const hashed = await hashPassword(password);

    //saving user details in database
    const user = await userModel({ username, email, password: hashed }).save();

    res.status(201).send({
      success: true,
      message: "Account Created Successfully",
      user,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "internal server error",
    });
  }
};

// USER LOGIN CONTROLLER
export const userLoginController = async (req, res) => {
  try {
    const { email, password } = req.body;

    //CHECKING USER AVAIL. OR NOT
    const existUser = await userModel.findOne({ email });
    if (!existUser) {
      res.status(404).send({
        success: false,
        message: "Account Not Found",
      });
      return;
    }

    //COMPARING PASSWORD
    const comparePassword = await matchPassword(password, existUser.password);
    if (!comparePassword) {
      res.status(404).send({
        success: false,
        message: "Invalid Email Or Password",
      });
      return;
    }

    //CREATING TOKEN FOR USER
    const token = Jwt.sign(
      { id: existUser._id },
      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: process.env.ACCESS_TOKEN_EXPIRY }
    );

    res.status(200).send({
      success: true,
      message: "Login Successfull",
      existUser,
      token,
    });
  } catch (error) {
    console.log(error);
  }
};
