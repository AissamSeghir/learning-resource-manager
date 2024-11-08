import User from "../models/User.js";
import bcrypt from 'bcryptjs'

export const login = async (req,res)=>{
    try{

        const {email, password} = req.body
        const user = await User.findOne({email:email});
        const isPasswordCorrect = await bcrypt.compare(password, user.password )
        console.log(user);
        
        if(!user || !isPasswordCorrect){
            return res.status(400).json({error:"Invalid email or password"});
          }

          res.status(200).json({
            _id:user._id,
            email: user.email,
          });
      
        if (isPasswordCorrect) {
            console.log("yes");
            
        }else{
            console.log("no");
            
        }
        console.log(email);
        console.log(user);

    }catch(err){

        console.log("Error in login controller",err.message);
    res.status(400).json({error:err.message});

    }
}