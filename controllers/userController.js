import { comparePassword, hashPassword } from "../helpers/passwordAuth.js";
import UserModel from "../models/userModel.js";
import jwt from "jsonwebtoken";
export const register = async (req, res) => {
  // console.log("register EndPoint", req.body);
  const { name, email, password, secret } = req.body;

  if (!name) {
    return res.json({
      error: "Name is required",
    });
  }
  // return res.status(400).send("Name is required");
  if (!password || password.length < 4) {
    return res.json({
      error: "Password is Required and should be 4 character Long",
    });
  }
  // return res.status(400).send("Password is Required and should be 4 character Long");
  if (!secret) {
    return res.json({
      error: "Answer is required",
    });
  }
  // return res.status(400).send("Answer is required");
  const exist = await UserModel.findOne({ email });

  if (exist) {
    return res.json({
      error: "Email is taken",
    });
  }
  // return res.status(400).send("Email is taken");
  const hashedPassword = await hashPassword(password);

  const user = new UserModel({ name, email, password: hashedPassword, secret }); // Use UserModel instead of User

  try {
    await user.save();
    console.log("Register user =>", user);
    return res.json({
      ok: true,
      message: "Register Successfull",
    });
  } catch (error) {
    console.error("Register Failed", error);
    return res.json({
      error: "Registration Failed",
    });
    // status(500).send("Registration failed");
  }
};
export const login = async (req, res) => {
  // console.log(req.body);
  try {
    const { email, password } = req.body;
    // check if our db has user with that email
    const user = await UserModel.findOne({ email });
    if (user === null)
      return res.json({
        error: "No user found!",
      });
    // check password
    const match = await comparePassword(password, user.password);
    if (!match)
      return res.json({
        error: "Wrong Password!",
      });
    // create signed token
    const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "21d",
    });
    user.password = undefined;
    user.secret = undefined;
    res.json({
      token,
      user,
    });
  } catch (err) {
    console.log(err);
    return res.json({
      error: "Invailed Crediential",
    });
    // status(400).send(err.message);
  }
};
export const currentUser = async (req, res) => {
  try {
    const user = await UserModel.findById(req.user._id);
    console.log(user);
    // res.json(user);
    res.json({
      ok: true,
    });
  } catch (err) {
    console.log(err);
    res.json({
      error: "401 Error",
    });
    // register.sendStatus(400);
  }
  console.log(req.user);
};
export const forgotPassword = async (req, res, next) => {
  const { email, newpassword, secret } = req.body;
  // validation
  if (!newpassword || newpassword.length < 6) {
    return res.json({
      error: "New password is required and should be min 6 characters long",
    });
  }
  if (!secret) {
    return res.json({
      error: "Secret is required",
    });
  }
  let user = await UserModel.findOne({ email, secret });

  if (!user) {
    return res.json({
      error: "We cant verify you with those details",
    });
  }
  // return res.status(400).send("We cant verify you with those details");

  try {
    const hashed = await hashPassword(newpassword);
    await UserModel.findByIdAndUpdate(user._id, { password: hashed });
    return res.json({
      success: "Congrats. Now you can login with your new password",
    });
  } catch (err) {
    console.log(err);
    return res.json({
      error: "Something wrong. Try again.",
    });
  }
};
