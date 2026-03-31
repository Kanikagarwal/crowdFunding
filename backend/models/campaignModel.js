import mongoose from "mongoose";

const campaignSchema = new mongoose.Schema({
    title: { type: String, required: true },
    category: { type: String, required: true },
    img: { type: String, required: true },
    desc: { type: String, required: true },
    goal: { type: Number, required: true },
    days: { type: Number, required: true },
    raised: { type: Number, default: 0 },
    backers: { type: Number, default: 0 },
    organiserId: { type: mongoose.Schema.Types.ObjectId, ref: 'Organiser', required: true },
    createdAt: { type: Date, default: Date.now },
});

const campaignModel = mongoose.model("Campaign", campaignSchema);
export default campaignModel;
