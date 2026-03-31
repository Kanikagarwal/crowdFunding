import express from 'express';
import cors from "cors";
import "dotenv/config"
import connectDB from './config/mongodb.js';
import userRouter from './routes/userRoutes.js';

const app = express();
const PORT = process.env.PORT || 5000;
const allowedOrigins = ["http://localhost:5173"];
app.use(express.json())

app.use(cors({
    origin:allowedOrigins,
    credentials:true,
}))
await connectDB();
app.get("/",(req,res)=>{
    res.send("Hello World");
    
})

app.use("/api/user",userRouter);
app.listen(PORT,()=>{
    console.log(`Server is running on ${PORT}`);
})
