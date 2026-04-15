import express from 'express';
import { register, login, createCampaign } from '../controllers/organiserController.js';
import { getOrganiserCampaigns } from '../controllers/campaignController.js';
import authOrganiser from '../middleware/authOrganiser.js';
import upload from '../middleware/upload.js';

const organiserRouter = express.Router();

organiserRouter.post("/register", register);
organiserRouter.post("/login", login);
organiserRouter.post("/campaigns", authOrganiser, upload.single("image"), createCampaign);
organiserRouter.get("/my-campaigns", authOrganiser, getOrganiserCampaigns);

export default organiserRouter;
