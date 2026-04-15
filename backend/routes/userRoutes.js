import express from 'express'
import { registerUser, loginUser } from '../controllers/userController.js'
import {createOrder,verifyPayment} from '../controllers/userController.js'
import authMiddleware from '../middleware/auth.js';

const userRouter = express.Router();
userRouter.post("/register",registerUser);
userRouter.post("/login",loginUser);
userRouter.post("/create-order",createOrder);
userRouter.post("/verify-payment",authMiddleware,verifyPayment);

export default userRouter;