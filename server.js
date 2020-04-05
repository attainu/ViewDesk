const express = require('express')
const logger = require('morgan')
const cors = require('cors')
const postRoutes = require('./routes/postRoutes')
const getRoutes = require('./routes/getRoutes')

require('dotenv').config()

const app = express()
const port = process.env.PORT || 3000

app.use(cors())
app.use(logger('dev'))
app.use(express.json())
app.use(express.urlencoded({extended: false}))
app.use(postRoutes)
app.use(getRoutes)

app.listen(port, () => console.log(`Server: listening... on PORT ${port}`))