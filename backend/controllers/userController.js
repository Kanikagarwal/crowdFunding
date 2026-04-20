 import userModel from "../models/userModel.js";
 import bcrypt from "bcrypt";
 import jwt  from "jsonwebtoken";
import Razorpay from "razorpay";
import razorpayInstance from "../config/razorpay.js";
import Campaign from "../models/campaignModel.js";
import Donation from "../models/donationModel.js";
import crypto from "node:crypto";
import sendEmail from "../utils/sendEmail.js";


 export const registerUser = async(req,res)=>{
    try {
        const {name,email,password} = req.body;
        if(!name || !email || !password){
            return res.json({success:false,message:"Missing Details"});
        }
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password,salt);

        const userData = {
            name,email,password:hashedPassword
        }
        const newUser = new userModel(userData);
        const user = await newUser.save();

        const token = jwt.sign({id:user._id},process.env.JWT_SECRET)
        res.json({success:true,token,user:{name:user.name}})
        
    } catch (error) {
        console.log(error);
        res.json({success:false,message:"Wrong details"});
        
    }
 }

 export const loginUser = async(req,res)=>{
    try {
        const {email,password}=req.body;
        const user = await userModel.findOne({email});
        if(!user){
            return res.json({success:false,message:"User Not found"});

        }
        const isMatch = await bcrypt.compare(password,user.password);
        if(!isMatch){
            return res.json({success:false,message:"Wrong Password"});
        }
        const token = jwt.sign({id:user._id},process.env.JWT_SECRET);
        res.json({success:true,token,user:{name:user.name}});
    } catch (error) {
        console.log(error);
        res.json({success:false,message:"Wrong Details"})
        
    }
 }



export const createOrder = async (req, res) => {
  try {
    const { amount } = req.body;

    if (!amount || amount <= 0) {
      return res.status(400).json({
        success: false,
        message: "Invalid amount",
      });
    }

    const options = {
      amount: amount * 100,
      currency: process.env.CURRENCY || "INR",
      receipt: `receipt_${Date.now()}`,
    };

    const order = await razorpayInstance.orders.create(options);

    res.status(200).json({
      success: true,
      order,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Order creation failed",
    });
  }
};

export const verifyPayment = async(req,res)=>{
  try{
    const {razorpay_order_id,razorpay_payment_id,razorpay_signature,campaignId,amount} = req.body;
    const body = `${razorpay_order_id}|${razorpay_payment_id}`;
    const expectedSignature = crypto.createHmac("sha256",process.env.RAZORPAY_KEY_SECRET).update(body.toString()).digest("hex");
  
    if(expectedSignature === razorpay_signature){
      const campaign = await Campaign.findById(campaignId).populate("organiserId");

// 💰 always increase amount
campaign.raised += Number(amount);

// 👤 check if user already donated
const alreadyDonated = campaign.donors.some(
  (donor) => donor.toString() === req.user.id.toString()
);

if (!alreadyDonated) {
  campaign.donors.push(req.user.id);
  campaign.backers += 1;
}

await campaign.save();
await Donation.create({
        userId: req.user.id,
        campaignId,
        amount,
        paymentId: razorpay_payment_id,
        orderId: razorpay_order_id,
        status: "success"
      });

      await sendEmail(
      campaign.organiserId.email,
      "New Donation Received 🎉",
      `Hello ${campaign.organiserId.name},

You have received a new donation!

Campaign: ${campaign.title}
Amount: ₹${amount}

Check your dashboard for details 🚀`
    );


      return res.json({success:true})
    }
    else{
      return res.json({success:false})
    }
  }
  catch(error){
    console.log(error);
    return res.json({success:false})
  }
}

export const getUserDonations = async (req, res) => {
  try {
    const userId = req.user.id;

    const donations = await Donation.find({ userId })
      .populate("campaignId", "title img")
      .sort({ createdAt: -1 });

    res.json({ success: true, donations });

  } catch (err) {
    res.status(500).json({ success: false });
  }
};