import express from 'express';
import cors from "cors";
import "dotenv/config"
import connectDB from './config/mongodb.js';
import userRouter from './routes/userRoutes.js';
import organiserRouter from './routes/organiserRoutes.js';

import campaignRouter from './routes/campaignRoutes.js';


const app = express();
const PORT = process.env.PORT || 5000;
const allowedOrigins = ["http://localhost:5173", "http://localhost:5174", "http://localhost:5175","https://crowd-funding-slhr.vercel.app"];
app.use(express.json())

// app.use("/uploads", express.static("uploads"));


app.use(cors({
    origin:allowedOrigins,
    credentials:true,
}))
await connectDB();
app.get("/",(req,res)=>{
    res.send("Hello World");
    
})

app.use("/api/user",userRouter);
app.use("/api/organiser", organiserRouter);
app.use("/api/campaigns", campaignRouter);

app.listen(PORT,()=>{
    console.log(`Server is running on ${PORT}`);
})
app.use((err, req, res, next) => {
  console.log("GLOBAL ERROR:", err);
  console.log("MESSAGE:", err.message);

  res.status(500).json({
    success: false,
    message: err.message || "Something went wrong",
  });
});