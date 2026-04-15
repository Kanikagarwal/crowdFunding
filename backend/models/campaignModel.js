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

// 🔥 Virtual field
campaignSchema.virtual("daysLeft").get(function () {
  const now = new Date();
  const createdAt = new Date(this.createdAt);

  const diffTime = now - createdAt;

  const daysPassed = Math.floor(
    diffTime / (1000 * 60 * 60 * 24)
  );

  return Math.max(this.days - daysPassed, 0);
});

// 🔥 THIS IS THE MISSING PART
campaignSchema.set("toJSON", { virtuals: true });
campaignSchema.set("toObject", { virtuals: true });

const campaignModel = mongoose.model("Campaign", campaignSchema);
export default campaignModel;