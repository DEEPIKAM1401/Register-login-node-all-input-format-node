const db = require("../routes/db-config");
const jwt = require("jsonwebtoken");
const loggeddIn = (req, res, next)=>{
    if(!req.cookies.userRegistered) return next();
    try
    {
        const decoded = jwt.verify(req.cookies.userRegistered, process.env.JWT_SECRET);
        db.query("SELECT * FROM users WHERE id=?", [decoded.id], (err, result)=>{
            if(err) return next(err);
            req.user = result[0];
            next();
        })
    }
    catch(err)
    {
         next(err);
    }
}
module.exports = loggeddIn;