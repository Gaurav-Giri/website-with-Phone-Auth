import admin from 'firebase-admin';
import User from '../models/User.js';
import { createRequire } from 'node:module';

const require = createRequire(import.meta.url);
const serviceAccount = require('../config/service_key.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

export const verifyToken = async (req, res) => {
  try {
    const { idToken, phone } = req.body;

    // Verify Firebase ID token
    const decodedToken = await admin.auth().verifyIdToken(idToken);

    // Verify phone number matches
    if (decodedToken.phone_number !== phone) {
      return res.status(401).json({
        success: false,
        message: 'Phone number mismatch'
      });
    }

    // Check if user exists
    const user = await User.findOne({ phone });

    if (user) {
      return res.json({
        success: true,
        user: {
          phone: user.phone,
          name: user.name,
          email: user.email
        }
      });
    }

    // New user
    res.json({
      success: true,
      user: null
    });

  } catch (error) {
    console.error('Token verification error:', error);
    res.status(401).json({
      success: false,
      message: 'Invalid token'
    });
  }
};

export const registerUser = async (req, res) => {
  try {
    const { phone, name, email } = req.body;

    // Check if user already exists
    const existingUser = await User.findOne({ phone });
    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: 'User already exists'
      });
    }

    // Create new user
    const newUser = new User({ phone, name, email });
    await newUser.save();

    res.status(201).json({
      success: true,
      user: {
        phone: newUser.phone,
        name: newUser.name,
        email: newUser.email
      }
    });

  } catch (error) {
    console.error('Registration error:', error);
    res.status(500).json({
      success: false,
      message: 'Registration failed'
    });
  }
};
