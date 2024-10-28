const db = require("../routes/db-config");
const bcrypt = require("bcryptjs");
// const express = require('express');
// const multer = require('multer');
// const { error } = require("console");
const path = require("path");


// const upload = multer({ dest: 'uploads/' });

const updateUser = async (req, res) => {
    const { email, password, course, gender, skills } = req.body;
    const file = req.file;

    console.log('Request body:', req.body);
    console.log('Uploaded file:', file);

    // Validate incoming data
    if (!req.user) {
        return res.status(401).json({ status: "error", error: "Unauthorized" });
    }

    const updates = {};

    // Check for required fields
    if (!email || !course || !gender || !skills) {
        return res.status(400).json({ status: "error", error: "Please enter all required fields: email, course, gender, and skills." });
    }

    if (!file) {
        return res.status(400).json({ status: "error", error: "Please choose a file." });
    }

    updates.email = email;

    // Only hash password if it's provided
    if (password) {
        updates.password = await bcrypt.hash(password, 8); // Hash the new password
    }

    updates.course = course;
    updates.gender = gender;
    updates.skills = skills; // Assume skills is a string, if it’s an array join it
    
    // Handle file upload
    if (file) {
        updates.file_path = file.path; // Use the path from the uploaded file
    }

    // Log the updates object to see what will be sent to the database
    console.log('Updates:', updates);

    const userId = req.user.id; // Assuming req.user is set by loggedIn middleware

    // Update user in the database
    db.query("UPDATE users SET ? WHERE id = ?", [updates, userId], (error, results) => {
        if (error) {
            console.error("Database error: ", error);
            return res.status(500).json({ status: "error", error: "Database error: " + error.message });
        }

        console.log("Update results:", results); // Log results
        if (results.affectedRows === 0) {
            console.log("No rows updated. User ID may not exist.");
            return res.status(404).json({ status: "error", error: "User not found or no changes made." });
        }

        console.log("User details updated successfully.");

        return res.json({ status: "success", success: "User has been registered" });

    });
};

module.exports = updateUser;