'use strict'

const express    = require('express')
const path       = require('path')
const bodyParser = require('body-parser')

const app = express()
const port = process.env.PORT || 5002

app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

if (process.env.NODE_ENV === 'production') {
  app.use(express.static('dist'))

  app.get('*', function(req, res) {
    res.sendFile(path.resolve(__dirname, 'dist','index.html'))
  })
}

app.listen(port, () => console.log(`Listening on port http://localhost:${port}`))