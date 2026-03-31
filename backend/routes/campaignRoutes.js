import express from 'express';
import { getAllCampaigns } from '../controllers/campaignController.js';

const campaignRouter = express.Router();

campaignRouter.get("/", getAllCampaigns);

export default campaignRouter;
