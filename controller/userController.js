import bcrypt from "bcryptjs";
import { User } from "../model/User.js";

export const signup = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const checkUser = await User.findOne({ email });

    if (checkUser) {
      return res.json({
        message: "User Already Exists",
        status: false,
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    await User.create({
      name,
      email,
      password: hashedPassword,
    });

    res.json({
      message: "Signup Successful",
      status: true,
    });

  } catch (error) {
    res.status(500).json({
      message: error.message,
      status: false,
    });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (!user) {
      return res.json({
        message: "User Not Found",
        status: false,
      });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.json({
        message: "Invalid Password",
        status: false,
      });
    }

    res.json({
      message: "Login Successful",
      status: true,
    });

  } catch (error) {
    res.status(500).json({
      message: error.message,
      status: false,
    });
  }
};
