const express = require("express");
const db = require("./routes/db-config");
const app = express();
const cookie = require("cookie-parser");
const bodyParser = require('body-parser');
const session = require('express-session');


const PORT = process.env.PORT || 5000;
app.use("/js", express.static(__dirname+"/public/js"))
app.use("/css", express.static(__dirname+"/public/css"))
app.use(bodyParser.json());
app.set("view engine", "ejs");
app.set("views", "./views");
app.use(cookie());
app.use(express.json());

app.use(bodyParser.urlencoded({ extended: true }));
app.use(session({
    secret: 'your_secret_key',
    resave: false,
    saveUninitialized: true
}));

db.connect((err)=>{
    if(err) throw err;
    console.log("database connected, PORT:"+PORT);
}) 




app.use(bodyParser.json({ limit: '10mb' })); // Adjust as needed
app.use(bodyParser.urlencoded({ limit: '10mb', extended: true }));
app.use("/", require("./routes/pages"));
app.use("/api", require("./controllers/auth"));
// Dashboard route
app.get('/dashboard', (req, res) => {
    if (!req.user) return res.redirect('/login');
    const userRole = req.user.role;
    if (userRole === 'admin') {
        res.render('admin_dashboard', { user: req.user });
    } else {
        res.render('user_dashboard', { user: req.user });
    }
  });
app.listen(PORT); 
