import express from 'express';
import { verifyToken, registerUser } from '../controllers/authController.js';

const router = express.Router();

// Verify Firebase token and check user
router.post('/verify-token', verifyToken);

// Register new user
router.post('/register', registerUser);

export default router;