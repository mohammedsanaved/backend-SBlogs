import { hashPassword } from "../helpers/passwordAuth.js";
import UserModel from "../models/userModel.js";

export const register = async (req, res) => {
  // console.log("register EndPoint", req.body);
  const { name, email, password, secret } = req.body;

  if (!name) return res.status(400).send("Name is required");
  if (!password || password.length < 4)
    return res
      .status(400)
      .send("Password is Required and should be 4 character Long");
  if (!secret) return res.status(400).send("Answer is required");
  const exist = await UserModel.findOne({ email });
  if (exist) return res.status(400).send("Email is taken");
  const hashedPassword = await hashPassword(password);

  const user = new UserModel({ name, email, password: hashedPassword, secret }); // Use UserModel instead of User

  try {
    await user.save();
    console.log("Register user =>", user);
    return res.json({
      ok: true,
    });
  } catch (error) {
    console.error("Register Failed", error);
    return res.status(500).send("Registration failed");
  }
};
