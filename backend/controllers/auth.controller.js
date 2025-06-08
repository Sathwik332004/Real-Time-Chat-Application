import bcrypt from "bcryptjs";
import User from "../models/user.model.js";
import generateTokenAndSetCookie from "../utils/generateToken.js";
import nodeMailer from "nodemailer";
import jwt1 from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

const sendResetPasswordMail = async (name, email, token) => {
  try {
    const transporter = nodeMailer.createTransport({
      service: "gmail",
      host: "smtp.gmail.com",
      port: 587,
      secure: false,
      requireTLS: true,
      auth: {
        user: process.env.USER,
        pass: process.env.PASS,
      },
    });

    const mailOptions = {
      from: {
        name: "ChatterBox",
        address: process.env.USER,
      },
      to: email,
      subject: "Reset Password",
      html: `
            <div style="max-width: 700px;
            margin:auto;
            border: 10px solid #ddd
            ">
            <div style="
            padding: 50px 20px;
            font-size: 20px;
            line-height: 40px;
                ">
            <h2 style="
            font-size: 1.4em;
            margin-bottom: 20px;
            ">
            Hi ${name} you have
            requested to reset your password
            </h2>
            <p>
            Please click following link
            <a href="http://localhost:3000/reset/${token}">Reset Password</a>
            </p>
            </div>
            </div>
            `,
    };

    transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
        console.log(error);
      } else {
        console.log("Mail has been sent:-", info.response);
      }
    });
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const signup = async (req, res) => {
  try {
    const { fullName, username, email, password, confirmPassword, gender } =
      req.body;

    if (password !== confirmPassword) {
      return res
        .status(400)
        .json({ message: "Password and Confirm Password does not match" });
    }

    const user = await User.findOne({ username });

    if (user) {
      return res.status(800).json({ message: "User already exists" });
    }

    const emailUser = await User.findOne({ email });
    if (emailUser) {
      return res.status(800).json({ message: "Email already exists" });
    }

    //HASH PASSWORD HERE
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const boyProfilePic = `https://avatar.iran.liara.run/public/boy?username=${username}`;
    const girlProfilePic = `https://avatar.iran.liara.run/public/girl?username=${username}`;

    const newUser = new User({
      fullName,
      username,
      email,
      password: hashedPassword,
      gender,
      profilePic: gender === "male" ? boyProfilePic : girlProfilePic,
    });

    if (newUser) {
      //Generate JWT token here
      await generateTokenAndSetCookie(newUser._id, res);
      await newUser.save();

      res.status(201).json({
        _id: newUser._id,
        fullName: newUser.fullName,
        username: newUser.username,
        email: newUser.email,
        gender: newUser.gender,
        profilePic: newUser.profilePic,
      });
    } else {
      res.status(400).json({ message: "Invalid User Data" });
    }
  } catch (error) {
    console.log("Error in signup controller", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const login = async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ username });
    const isPasswordCorrect = await bcrypt.compare(
      password,
      user?.password || ""
    );
    if (!user || !isPasswordCorrect) {
      return res.status(400).json({ error: "Invalid Credentials" });
    }
    generateTokenAndSetCookie(user._id, res);

    res.status(200).json({
      _id: user._id,
      fullName: user.fullName,
      username: user.username,
      profilePic: user.profilePic,
    });
  } catch (error) {
    console.log("Error in login controller", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const logout = (req, res) => {
  try {
    res.cookie("jwt", "", { maxAge: 0 });
    res.status(200).json({ message: "Logged Out Successfully" });
  } catch (error) {
    console.log("Error in login controller", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const forgot = async (req, res) => {
  try {
    const email = req.body.email;
    const user = await User.findOne({
          email: email, 
    });
    if (user) {
      //const random = randomString.generate();
      const random = jwt1.sign({ id: user.id }, process.env.JWT_SECRET, {
        expiresIn: "5m",
      });
      const data = await User.updateOne(
        { email: email },
        { $set: { token: random } }
      );
      sendResetPasswordMail(user.fullName, user.email, random);
      res
        .status(200)
        .json({
          message: "Email sent to your mail inbox and reset you password.",
        });
    } else {
      res.status(200).json({ error: "Invalid username or email" });
    }
  } catch (error) {
    console.error("Error in forgot controller: ", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const reset = async (req, res) => {
  try {
    const { token } = req.params;
    const { password, confirmPassword } = req.body;
    if (password !== confirmPassword) {
      return res
        .status(400)
        .json({ message: "Password and Confirm Password does not match" });
    }
    if (!token) {
      return res.status(400).json({ error: "Token is required" });
    }
    const user = await User.findOne({ token: token });
    if (user) {
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);
      const updatedPassword = await User.findByIdAndUpdate(
        {
          _id: user._id,
        },
        { $set: { password: hashedPassword, token: "" } },
        { new: true }
      );
      res
        .status(200)
        .json({
          success: true,
          message: "Password updated successfully",
          data: updatedPassword,
        });
    } else {
      res.status(200).json({ error: "This Link has been expired" });
    }
  } catch (error) {
    console.error("Error in reset controller: ", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
