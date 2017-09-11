/* eslint linebreak-style: ["error", "windows"] */

import express from 'express';
// import bcrypt from 'bcrypt';
// import jwt from 'jsonwebtoken';

const router = express.Router();

router.post('/', (req, res) => {
    res.status(400).json({ errors: { global: "Invalid credentials" } });
});

export default router;