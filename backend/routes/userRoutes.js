import express from 'express'
import { registerUser, loginUser, getUserDonations } from '../controllers/userController.js'
import {createOrder,verifyPayment} from '../controllers/userController.js'
import authMiddleware from '../middleware/auth.js';
import { get } from 'mongoose';

const userRouter = express.Router();
userRouter.post("/register",registerUser);
userRouter.post("/login",loginUser);
userRouter.post("/create-order",createOrder);
userRouter.post("/verify-payment",authMiddleware,verifyPayment);
userRouter.get("/history",authMiddleware,getUserDonations)

export default userRouter;