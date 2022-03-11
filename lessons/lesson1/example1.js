require("dotenv").config();
const cloudinary = require("cloudinary").v2;

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_KEY,
  api_secret: process.env.CLOUDINARY_SECRET,
});

cloudinary.uploader
  .upload("images/45244-1641671993864.jpg")
  .then((uploadResult) => console.log(JSON.stringify(uploadResult, null)))
  .catch((error) => console.error(error));

// cloudinary.uploader.upload(
//   "images/45244-1641671993864.jpg",
//   {
//     tags: "basic_sample",
//     width: 300,
//     height: 500,
//     crop: "fit",
//     effect: "saturation:-70",
//   },
//   function (err, image) {
//     console.log();
//     console.log("** Remote Url");
//     if (err) {
//       console.warn(err);
//     }
//     console.log("* " + image.public_id);
//     console.log("* " + image.url);
//     // waitForAllUploads("couple2", err, image);
//   }
// );

// function waitForAllUploads(id, err, image) {
//   var uploads = {};
//   uploads[id] = image;
//   var ids = Object.keys(uploads);
//   if (ids.length === 6) {
//     console.log();
//     console.log("**  uploaded all files (" + ids.join(",") + ") to cloudinary");
//     performTransformations();
//   }
// }
