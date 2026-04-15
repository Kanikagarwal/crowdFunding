import express from 'express';
import { getAllCampaigns } from '../controllers/campaignController.js';
import { getCampaignById } from '../controllers/campaignController.js';

const campaignRouter = express.Router();

campaignRouter.get("/", getAllCampaigns);
campaignRouter.get("/get-campaign/:id", getCampaignById);

export default campaignRouter;
