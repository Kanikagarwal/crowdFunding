import express from 'express';
import cors from "cors";

import "dotenv/config"

const app = express();
const PORT = process.env.PORT || 5000;
const allowedOrigins = ["http://localhost:5173"];

app.use(cors({
    origin:allowedOrigins,
    credentials:true,
}))

app.get("/",(req,res)=>{
    res.send("Hello World");
    
})

app.listen(PORT,()=>{
    console.log(`Server is running on ${PORT}`);
})
