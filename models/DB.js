const mongoose = require('mongoose')
require('dotenv').config()

const url = `mongodb+srv://AllSpark-ViewDesk:${process.env.ATLAS_PWD}@cluster0-i1pir.mongodb.net/ViewDesk?retryWrites=true&w=majority`
mongoose.Promise = global.Promise

// Dadtabase connection promise
mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(connect => console.log(`Database connected`))
    .catch(err => console.log(`Database ${err}`))