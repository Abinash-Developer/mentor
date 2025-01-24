const express = require('express');
const cors = require('cors');
const app = express();
const path = require('path');
const connectionDB = require('./config/connection');
const allRoute = require('./routes/index');

app.use(express.urlencoded({extended: true})); 
app.use(express.json());

app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
app.use(cors());
app.use('/',allRoute);
connectionDB();
app.listen(8080,()=>{
    console.log("Server is listning on port 8080");
});