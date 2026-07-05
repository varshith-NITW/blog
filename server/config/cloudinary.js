const cloudinary = require('cloudinary');

const isCloudinaryConfigured = !!(
    process.env.CLOUDINARY_CLOUD_NAME &&
    process.env.CLOUDINARY_API_KEY &&
    process.env.CLOUDINARY_API_SECRET
);
//cloud name dgr1x72bo
//api key 339915668234582
//secret GZdN30hT4XgK8jQQQBnfY8F9ASs
if (isCloudinaryConfigured) {
    cloudinary.v2.config({
        cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
        api_key: process.env.CLOUDINARY_API_KEY,
        api_secret: process.env.CLOUDINARY_API_SECRET
    });
    console.log("cloudinary success");
} else {
    console.log("cloudinary disabled");
}

module.exports = {
    cloudinary: cloudinary.v2,
    isCloudinaryConfigured
};
