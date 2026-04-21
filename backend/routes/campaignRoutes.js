import express from "express";
import authOrganiser from "../middleware/authOrganiser.js";
import authMiddleware from "../middleware/auth.js";

import {
  getAllCampaigns,
  getCampaignById,
  deleteCampaign,
  toggleLikeCampaign,
} from "../controllers/campaignController.js";

const campaignRouter = express.Router();

// Get all campaigns
campaignRouter.get("/", getAllCampaigns);

// Get single campaign
campaignRouter.get("/get-campaign/:id", getCampaignById);

// Delete campaign
campaignRouter.delete(
  "/delete-campaign/:id",
  authOrganiser,
  deleteCampaign
);

// Like / Unlike Campaign
campaignRouter.post(
  "/:id/like",
  authMiddleware,
  toggleLikeCampaign
);

export default campaignRouter;