const mongoose = require('mongoose')
require("dotenv").config();
//mongoose.set('strictQuery', false)

const mongo_url = process.env.MONGO_CONN;

mongoose.connect(mongo_url).then(() => console.log('Connected to mongodb')).catch((e) => console.log(e))