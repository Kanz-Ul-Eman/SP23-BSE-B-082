const { CloudinaryStorage } = require("multer-storage-cloudinary");
const cloudinary = require("cloudinary").v2;
const dotenv = require("dotenv");

dotenv.config({ path: ".env.local" });
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

/*************  ✨ Codeium Command ⭐  *************/
/**
 * Creates a Multer storage engine for Cloudinary.
 *
 * @param {Object} [options] - Options for the storage engine.
 * @param {string} [options.folder="picture"] - The folder in Cloudinary to store the file.
 * @param {string} [options.resourceType="image"] - The type of resource to store.
 * @param {Function} [options.format] - A function that takes the request and file objects and returns the file format.

/******  c47e41d4-ecc3-48dd-9f92-bdf735e64d17  *******/
const createCloudinaryStorage = ({
  folder = "picture",
  resourceType = "image",
  format = async (req, file) => {
    const mimeType = file.mimetype.split("/")[1];
    const allowedFormats = ["jpeg", "png", "jpg", "gif"];
    return allowedFormats.includes(mimeType) ? mimeType : "jpeg";
  },
  publicId,
}) => {
  return new CloudinaryStorage({
    cloudinary,
    params: {
      folder,
      resource_type: resourceType,
      format,
      public_id:
        publicId || ((req, file) => `${Date.now()}_${file.originalname}`),
    },
  });
};

module.exports = { createCloudinaryStorage };
