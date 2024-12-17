const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../model/User.js');

// User Registration
exports.registerUser = async (req, res) => {
  const { username, email, password } = req.body;

  try {
    let user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({ message: 'User already exists' });
    }

    user = new User({
      username,
      email,
      password,
    });

    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(password, salt);
    await user.save();

    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
      expiresIn: process.env.JWT_EXPIRATION,
    });

    res.json({ token });
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
};

// User Login
exports.loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
      expiresIn: process.env.JWT_EXPIRATION,
    });

    res.json({ token });
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
};
