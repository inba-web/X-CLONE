import User from "../models/user.model.js";
import bcrypt from "bcryptjs";

export const signup = async (req, res) => {
  try {
    const { userName, fullName, email, password } = req.body;

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ error: "Invalid Email Format" });
    }  

    const existingEmail = await User.findOne({ email });
    const existingUserName = await User.findOne({ userName });

    if (existingEmail || existingUserName) {
      res.status(400).json({ error: "Already Existing User or Email" });
    }
    if (password.length < 6) {
      return res
        .status(400)
        .json({ error: "Password Atleast must have 6 char length" });
    }

    // hashing the password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt); 

    const newUser = new User({
        userName,
        fullName,
        email,
        password:hashedPassword

    })

    if(newUser){
        await newUser.save();
        res.status(200).json({
            _id: newUser._id,
            userName:newUser.userName,
            fullName:newUser.fullName,
            email:newUser.email,
            followers:newUser.followers,
            following:newUser.following,
            profileImg:newUser.profileImg,
            coverImg:newUser.coverImg,
            bio:newUser.bio,
            link:newUser.link
        }) 
    }else{
        res.status(400).json({error:"Invalid user data"})
    }

  } catch (error) {
    console.log(`Error in signup controller : ${error}`);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const login = (req, res) => {
  try {
  } catch (error) {
    console.log(`Error in login controller : ${error}`);
  }
};

export const logout = (req, res) => {
  try {
  } catch (error) {
    console.log(`Error in logout controller : ${error}`);
  }
};
