import express from 'express';
import authRouter from "./auth.js"

const router = express.Router();
router.post('/auth', authRouter);

export default router