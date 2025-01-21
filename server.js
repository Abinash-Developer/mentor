const express = require('express');
const cors = require('cors');
const app = express();
const connectionDB = require('./config/connection');
const allRoute = require('./routes/index');

app.use(express.urlencoded({extended: true})); 
app.use(express.json());

app.use(cors());
app.use('/',allRoute);
connectionDB();
app.listen(8080,()=>{
    console.log("Server is listning on port 8080");
});