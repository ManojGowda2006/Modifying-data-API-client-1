const mongoose = require('mongoose');
require('dotenv').config();

const connect = ()=>{
    mongoose.connect(process.env.db_URL)
.then(() => console.log("connected"))
.catch(() => console.log("error connecting to db"))
}

module.exports = connect