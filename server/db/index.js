const mongoose = require('mongoose')
mongoose.set('strictQuery', false)

mongoose.connect('mongodb+srv://techlead:techlead@cluster0.baorezq.mongodb.net/').then(() => console.log('Connected to mongodb')).catch((e) => console.log(e))