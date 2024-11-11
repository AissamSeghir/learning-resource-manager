import User from "../models/User.js";
import bcrypt from 'bcryptjs'
import jwt from "jsonwebtoken";

export const login = async (req, res) => {
    try {
      const { email, password } = req.body;
  
      // Find user and verify password
      const user = await User.findOne({ email: email });
      if (!user) {
        return res.status(400).json({ error: "Invalid email or password" });
      }
  
      const isPasswordCorrect = await bcrypt.compare(password, user.password);
      if (!isPasswordCorrect) {
        return res.status(400).json({ error: "Invalid email or password" });
      }

       // Generate JWT
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: "15d" });

    // Set token as an HTTP-only cookie
    res.cookie("jwt", token, {
      httpOnly: true,
      maxAge: 15 * 24 * 60 * 60 * 1000, // 15 days
      sameSite: "strict",
      secure: process.env.NODE_ENV === "production",
    });
  
      // Send successful login response
      return res.status(200).json({
        _id: user._id,
        email: user.email,
      });
  
    } catch (err) {
      console.log("Error in login controller", err.message);
      res.status(500).json({ error: "Server error. Please try again later." });
    }
  };
  
  export const getMe = async (req, res) => {
    try {
      const user = await User.findById(req.user._id).select("-password");
      if (!user) {
        return res.status(404).json({ error: "User not found" });
      }
      res.status(200).json(user);
    } catch (error) {
      console.log("Error in getMe controller", error.message);
      res.status(500).json({ error: "Internal Server Error" });
    }
  };

  export const logout = async (req,res)=> {
    try{
        res.cookie("jwt","",{maxAge:0})
        res.status(200).json({message:"Logged out successfully"})

    }
    catch(error){
        console.log("Error in logout controller",error.message);
        res.status(400).json({error:"Internal Server Error"});
    }
};