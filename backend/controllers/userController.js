import validator from "validator";
import bcrypt from "bcrypt";
import jwt from 'jsonwebtoken'
import userModel from "../models/userModel.js";

const createToken = (id) => {
    return jwt.sign({id}, process.env.JWT_SECRET)
}

// Route for user login
const loginUser = async (req, res) => {
  try {
    const { email: rawEmail, password } = req.body;
    const email = rawEmail?.trim().toLowerCase();

    if (!email || !password) {
      return res.json({ success: false, message: "Email and password are required" });
    }

    const user = await userModel.findOne({ email });
    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.json({ success: false, message: "Invalid email or password" });
    }

    const token = createToken(user._id);
    return res.json({ success: true, token });
  } catch (error) {
    console.log(error);
    return res.json({ success: false, message: error.message });
  }
};

//Route for user  register
const registerUser = async (req, res) => {
  try {
    const { name, email: rawEmail, password } = req.body;
    const email = rawEmail?.trim().toLowerCase();

    if (!name?.trim() || !email || !password) {
      return res.json({
        success: false,
        message: "Name, email, and password are required"
      });
    }

    // validatting email format and strong password
    if (!validator.isEmail(email)) {
      return res.json({
        success: false,
        message: " please enter a valide email"
      })
    }
    if (password.length < 8) {
      return res.json({
        success: false,
        message: " please enter a Strong password"
      })
    }

    const exists = await userModel.findOne({ email });
    if (exists) {
      return res.json({ success: false, message: "User already exists" })
    }

    // hassing on  user password
    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(password, salt)

    const newUser = new userModel({
      name,
      email,
      password: hashedPassword
    })

    await newUser.save()

    res.json({ success: true, message: "User registered successfully" })



  } catch (error) {
    console.log(error);
    if (error.code === 11000) {
      return res.json({ success: false, message: "User already exists" })
    }
    res.json({ success: false, message: error.message })
  }
};

//Route for admin login
const adminLogin = async (req, res) => {
  try {
    
    const {email, password} = req.body

    if (email === process.env.ADMIN_EMAIL && password === process.env.ADMIN_PASSWORD){
        const token = jwt.sign(email+password, process.env.JWT_SECRET)
        res.json({success:true,token})
    } else {
      res.json({success:false,message:"Invalide Credentials"})
    }

  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message })
  }
};

export { loginUser, registerUser, adminLogin };
