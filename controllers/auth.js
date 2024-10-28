const express = require("express");
const multer = require('multer');
const path = require('path');

const register = require("./register");
const login = require("./login");
const updateUser = require("./update");
const loggeddIn = require("./loggeddIn");

// const logout = require("./logout");
const router = express.Router();


// Set up storage configuration for multer
const storage = multer.diskStorage({
    // Destination function
    destination: function(req, file, cb) {
        cb(null, './uploads/'); // 'uploads' is the folder where files will be saved
    },
    // Filename function
    filename: function(req, file, cb) {
        // Generate a unique filename by appending timestamp
        cb(null, file.originalname.replace(/\.[^/.]+$/, '') + '_' + Date.now() + path.extname(file.originalname));
    }
});

// Create multer instance
const upload = multer({ 
    storage: storage
});





// Use the upload middleware in your registration route
router.post("/register", upload.single('file'), register);

// router.post("/register", register);
router.post("/login", login);


// Route to update user details
router.post("/users/update", loggeddIn, upload.single('file'), updateUser);



module.exports = router;