const express = require('express')
const logger = require('morgan')
const cors = require('cors')
const apiRoutes = require('./routes/apiRoutes')
const normalRoutes = require('./routes/normalRoutes')

require('dotenv').config()

const app = express()
const port = process.env.PORT || 3000

app.use(cors())
app.use(logger('dev'))
app.use(express.json())
app.use(express.urlencoded({extended: false}))
app.use(apiRoutes)
app.use(normalRoutes)

app.listen(port, () => console.log(`Server: listening... on PORT ${port}`))