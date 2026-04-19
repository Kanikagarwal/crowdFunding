import mongoose from 'mongoose';

const donationSchema = new mongoose.Schema({
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true
    },
    campaignId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Campaign",
        required:true
    },
    amount: {
    type: Number,
    required: true
  },
  paymentId: {
    type: String
  }
}, { timestamps: true })


export default mongoose.model("Donation", donationSchema);