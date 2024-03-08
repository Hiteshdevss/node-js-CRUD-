const multer = require('multer');
const path = require('path');

// Define storage
var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, path.join(__dirname, '..', 'uploads')); // This creates a path to the "uploads" directory
    },
    filename: function (req, file, cb) {
        // Use the original name of the file
        cb(null, file.fieldname + "_" + Date.now() + path.extname(file.originalname));
    },
});

// Initialize multer upload
var upload = multer({
    storage: storage,
}).single('image');

module.exports = upload;
