import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import organiserModel from "../models/organiserModel.js";
import campaignModel from "../models/campaignModel.js";

export const register = async(req, res)=>{
    try {
        const {name, email, password} = req.body;
        if(!name || !email || !password){
            return res.json({success:false,message:"Missing Details"});
        }
        
        // check if already exists
        const existing = await organiserModel.findOne({email});
        if(existing) return res.json({success:false, message:"Email already exists"});

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const newOrganiser = new organiserModel({
            name, email, password: hashedPassword
        });
        const organiser = await newOrganiser.save();

        const token = jwt.sign({id: organiser._id}, process.env.JWT_SECRET);
        res.json({success: true, token, name: organiser.name});
        
    } catch (error) {
        console.log(error);
        res.json({success: false, message: "Server error"});
    }
}

export const login = async (req, res) => {
    try {
        const {email, password} = req.body;
        const organiser = await organiserModel.findOne({email});
        if(!organiser){
            return res.json({success:false, message: "Organiser Not found"});
        }
        const isMatch = await bcrypt.compare(password, organiser.password);
        if(!isMatch){
            return res.json({success:false, message:"Wrong Password"});
        }
        const token = jwt.sign({id: organiser._id}, process.env.JWT_SECRET);
        res.json({success:true, token, name: organiser.name});
    } catch (error) {
        console.log(error);
        res.json({success:false, message:"Server error"})
    }
}

export const createCampaign = async (req, res) => {
    try {
        const organiserId = req.organiserId; // from auth middleware
        const { title, category, img, desc, goal, days } = req.body;
        
        if(!title || !category || !img || !desc || !goal || !days) {
            return res.json({success:false, message: "Missing Campaign details"});
        }

        const newCampaign = new campaignModel({
            title, category, img, desc, goal, days, organiserId
        });
        await newCampaign.save();
        
        res.json({success: true, message: "Campaign created successfully"});
    } catch (error) {
        console.log(error);
        res.json({success: false, message: "Server error creating campaign"});
    }
}