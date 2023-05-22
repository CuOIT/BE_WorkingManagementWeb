// File: using to run server
const bodyParser = require("body-parser");
 const viewEngine =require("./config/viewEngine");
const privateRouter =require("./routes/private/index");
const publicRouter=require('./routes/public/index')
const authenToken= require('./middleware/index')
const connectDB =require("./config/connectDB");
const cors =require('cors');
const express=require('express')
require('dotenv').config();

let app = express();

// function authenToken(req, res, next) {
//     const authorizationHeader = req.headers['authorization'];
//     // 'Beaer [token]'
//     const token = authorizationHeader.split(' ')[1];
//     if (!token) res.sendStatus(401);
  
//     jwt.verify(token, process.env.SECRET, (err, data) => {
//       console.log(err, data);
//       if (err) res.sendStatus(403);
//       next();
//     });
//   }
  
app.use(cors({ origin: true, credentials: true }));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

viewEngine(app);
connectDB();

app.use('/api',publicRouter);

app.use('/api',authenToken,privateRouter);

//cài static file
app.use(express.static('public')); 

// run app
let port = process.env.PORT || 8080;

app.listen(port, () => {
    console.log("Our server is running on port", port);
})