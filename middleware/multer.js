const multer = require("multer");
const cloudinary = require("cloudinary").v2;
const { CloudinaryStorage } = require('multer-storage-cloudinary');
var uuid = require('uuid-random');

const storage =  new CloudinaryStorage({
cloudinary: cloudinary,
params: {
    public_id: (req, file) => {
        return 'cardimages/' + uuid();
    }
}
});
module.exports = multer({storage: storage});