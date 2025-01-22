const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const Patient = require("../models/Patient");

// exports.register = async (req, res) => {
//   try {
//     const { name, email, password, role } = req.body;
//     const hashedPassword = await bcrypt.hash(password, 10);
//     const user = new User({ name, email, password: hashedPassword, role });
//     await user.save();

//     // Automatically create a Patient record if the role is "Patient"
//     if (role === "Patient") {
//       const patient = new Patient({ user: user._id });
//       await patient.save();
//       console.log("Patient record created for user:", user._id);
//     }

//     res.status(201).json({ message: "User registered successfully" });
//   } catch (error) {
//     console.error("Error during registration:", error);
//     res.status(500).json({ error: "Registration failed" });
//   }
// };

exports.register = async (req, res) => {
  try {
    const { name, email, password, role } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new user
    const user = new User({ name, email, password: hashedPassword, role });
    await user.save();

    // Automatically create a Patient record if the role is "Patient"
    if (role === "Patient") {
      const patient = new Patient({ user: user._id });
      await patient.save();
      console.log("Patient record created for user:", user._id);
    }

    res.status(201).json({ message: "User registered successfully" });
  } catch (error) {
    console.error("Error during registration:", error);
    res.status(500).json({ error: "Registration failed" });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(401).json({ error: "Invalid credentials" });
    }
    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );
    res.json({ token });
  } catch (error) {
    res.status(500).json({ error: "Login failed" });
  }
};
