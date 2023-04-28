// File: using to run server
const bodyParser = require("body-parser");
 const viewEngine =require("./config/viewEngine");
const router =require("./routes/index");
const userRouter =require("./routes/users");

const connectDB =require("./config/connectDB");
const cors =require('cors');
const express=require('express')
require('dotenv').config();

let app = express();

app.use(cors({ origin: true, credentials: true }));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

viewEngine(app);
connectDB();

app.use('/home',router);
app.use('/user',userRouter);

//cài static file
app.use(express.static('public')); 

// run app
let port = process.env.PORT || 8080;

app.listen(port, () => {
    console.log("Our server is running on port", port);
})