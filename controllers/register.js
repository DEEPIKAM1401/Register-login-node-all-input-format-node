const db = require("../routes/db-config");
const bcrypt = require("bcryptjs");
const path =require("path");

const register = async (req, res) => {
    const { email, password: Npassword, course, gender, skills } = req.body;
    const file = req.file; // Path to the uploaded file

    if (!email || !Npassword || !course || !gender || !skills) {
        return res.json({ status: "error", error: "Please Enter your email and password, course, gender" });
    }
    const filePath = path.join(__dirname, '../uploads',file.filename)
    // Database operations...
    db.query('SELECT email FROM users WHERE email = ?', [email], async (err, result) => {
        if (err) throw err;
        if (result[0]) return res.json({ status: "error", error: "Email has already been registered" });
        else {
            const password = await bcrypt.hash(Npassword, 8);
            db.query('INSERT INTO users SET ?', {
                email: email,
                password: password,
                course: course,
                gender: gender,
                skills: skills,
                file_path: filePath // Save the file path to the database
            }, (error, results) => {
                if (error) throw error;
                return res.json({ status: "success", success: "User has been registered" });
            });
        }
    });
}


module.exports = register;