import User from "../models/User.js";
import bcrypt from "bcryptjs";
export const addUser = async (req, res) => {
  try {
    const user = req.user;

    const { firstname, lastname, email, password } = req.body;
    console.log(req.body);

    if (!firstname || !lastname || !email) {
      return res.status(400).json({
        message: "firstname, lastname, and email are required",
      });
    }

    // Check if a user with  email  already exist
    const existingUser = await User.findOne({ email: email });
    if (existingUser) {
      return res.status(400).json({
        message: "this information already exists.",
      });
    }
    // Hashing password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUSer = new User({
      firstname: firstname,
      lastname: lastname,
      email: email,
      password: hashedPassword,
    });

    await newUSer.save();
    console.log("sing up successfully");
    return res.json({ message: "sing up successfully" });
  } catch (err) {
    console.error("Error in Sing up:", err.message);
    res.status(500).json({ error: err.message });
  }
};
