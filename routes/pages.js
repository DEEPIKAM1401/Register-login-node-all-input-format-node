  const db = require("./db-config")
  const express = require('express');
  const multer = require('multer');
  const loggeddIn = require("../controllers/loggeddIn");
  const logout = require("../controllers/logout");
  
  
  // const edit = require("../controllers/edit");
  // const update = require("../controllers/update");
  const router = express.Router();
 

  router.get("/", loggeddIn, (req,res)=>{
    if(req.user){
      res.render("index", {status:"loggeddIn", user:req.user});
      
    }
    else{
      res.render("index", {status:"no", user:"nothing"});
    }
   
  });

  router.get("/register", (req,res)=>{
    res.sendFile("register.html", {root: "./public"});
  });

  router.get("/login", (req,res)=>{
    res.sendFile("login.html", {root:"./public/"});
  });

  router.get("/users/edit/:id", loggeddIn, (req, res) => {
    const userId = req.params.id;
    db.query('SELECT * FROM users WHERE id = ?', [userId], (err, result) => {
        if (err) throw err;
        if (result.length > 0) {
          const skillsString = result[0].skills; // e.g., "HTML,CSS"
          const skillsArray = skillsString.split(',');
            res.render("edit", { user: result[0], skills:skillsArray });
        } else {
            res.status(404).send('User not found');
        }
    });
});



// router.post("/users/update/:id", loggeddIn, updateUser);





  router.get("/logout", logout);
  module.exports = router;
  