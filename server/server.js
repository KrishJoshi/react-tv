import bodyParser from 'body-parser'
import express from 'express'
const routes = require('./routes');
import path from 'path'

const app = express()
// add the path module
// get reference to the client build directory
const staticFiles = express.static(path.join(__dirname, '../../client/build'))
// pass the static files (react app) to the express app.
app.use(staticFiles)

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: false}))

require('./routes')(app, {}, {});

// any routes not picked up by the server api will be handled by the react router
app.use('/*', staticFiles)

app.set('port', (process.env.PORT || 3001))
app.listen(app.get('port'), () => {
  console.log(`Listening on ${app.get('port')}`)
})

