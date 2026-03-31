import campaignModel from "../models/campaignModel.js";

export const getAllCampaigns = async (req, res) => {
    try {
        const campaigns = await campaignModel.find({}).sort({createdAt: -1});
        res.json({ success: true, Object: campaigns });
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: "Error fetching campaigns" });
    }
}

export const getOrganiserCampaigns = async (req, res) => {
    try {
        const campaigns = await campaignModel.find({ organiserId: req.organiserId }).sort({createdAt: -1});
        res.json({ success: true, Object: campaigns });
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: "Error fetching organiser campaigns" });
    }
}
