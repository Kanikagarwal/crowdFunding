import { v2 as cloudinary } from "cloudinary";
import "dotenv/config";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_SECRET,
});

cloudinary.uploader.upload("test.txt", { resource_type: "raw" })
  .then(res => console.log("Success", res))
  .catch(err => console.log("Cloudinary Error:", err));
