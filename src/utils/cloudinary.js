import { v2 as cloudinary } from "cloudinary";
import fs from "fs";
import dotenv from "dotenv";

dotenv.config(); // ❗ REQUIRED

// Configure cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Upload file to Cloudinary
const uploadOnCloudinary = async (localFilePath) => {
  try {
    if (!localFilePath) return null;

    const result = await cloudinary.uploader.upload(localFilePath, {
      resource_type: "auto",
    });

    // Remove file from local storage
    fs.unlink(localFilePath, (err) => {
      if (err) console.log("Failed to delete local file:", err);
    });

    console.log("Uploaded to Cloudinary:", result.url);

    return result;
  } catch (error) {
    console.error("Cloudinary upload error:", error);

    // Cleanup
    if (fs.existsSync(localFilePath)) {
      fs.unlinkSync(localFilePath);
    }

    return null;
  }
};


const deleteFromCloudinary = async (publicId) =>{
  try {
   const result =  cloudinary.uploader.destroy(publicId)
   console.log("Deleted from cloudinary . Public", publicId)
    
  } catch (error) {
    console.log("Error deleting from cloudinary " , error)
    return null
    
  }
}

export { uploadOnCloudinary , deleteFromCloudinary };
