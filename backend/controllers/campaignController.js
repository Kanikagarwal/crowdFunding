import campaignModel from "../models/campaignModel.js";

// ==============================
// Get All Campaigns
// ==============================
export const getAllCampaigns = async (req, res) => {
  try {
    const campaigns = await campaignModel
      .find({})
      .sort({ createdAt: -1 });

    res.json({
      success: true,
      Object: campaigns,
    });

  } catch (error) {
    console.log(error);

    res.json({
      success: false,
      message: "Error fetching campaigns",
    });
  }
};

// ==============================
// Get Organiser Campaigns
// ==============================
export const getOrganiserCampaigns = async (req, res) => {
  try {
    const campaigns = await campaignModel
      .find({ organiserId: req.organiserId })
      .sort({ createdAt: -1 });

    res.json({
      success: true,
      Object: campaigns,
    });

  } catch (error) {
    console.log(error);

    res.json({
      success: false,
      message: "Error fetching organiser campaigns",
    });
  }
};

// ==============================
// Get Campaign By Id
// ==============================
export const getCampaignById = async (req, res) => {
  try {
    const campaign = await campaignModel.findById(req.params.id);

    if (!campaign) {
      return res.json({
        success: false,
        message: "Campaign not found",
      });
    }

    res.json({
      success: true,
      campaign,
    });

  } catch (error) {
    console.log(error);

    res.json({
      success: false,
      message: "Error fetching campaign",
    });
  }
};

// ==============================
// Delete Campaign
// ==============================
export const deleteCampaign = async (req, res) => {
  try {
    const { id } = req.params;
    const organiserId = req.organiserId;

    const campaign = await campaignModel.findById(id);

    if (!campaign) {
      return res.json({
        success: false,
        message: "Campaign not found",
      });
    }

    // only owner can delete
    if (
      campaign.organiserId.toString() !==
      organiserId.toString()
    ) {
      return res.json({
        success: false,
        message: "Unauthorized",
      });
    }

    await campaignModel.findByIdAndDelete(id);

    res.json({
      success: true,
      message: "Campaign deleted successfully",
    });

  } catch (error) {
    console.log(error);

    res.json({
      success: false,
      message: "Delete failed",
    });
  }
};

// Like button
export const toggleLikeCampaign = async (req, res) => {
  try {
    const campaignId = req.params.id;
    const userId = req.body.userId;

    const campaign = await campaignModel.findById(campaignId);

    if (!campaign) {
      return res.json({
        success: false,
        message: "Campaign not found"
      });
    }

    const alreadyLiked = campaign.likes.some(
      (id) => id.toString() === userId
    );

    if (alreadyLiked) {
      campaign.likes = campaign.likes.filter(
        (id) => id.toString() !== userId
      );
    } else {
      campaign.likes.push(userId);
    }

    await campaign.save();

    res.json({
      success: true,
      liked: !alreadyLiked,
      likeCount: campaign.likes.length
    });

  } catch (error) {
    res.json({
      success: false,
      message: error.message
    });
  }
};