import bodyParser from 'body-parser'
import express from 'express'
import routes from './routes/index'

const app = express()
// add the path module
import path from 'path'


app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: false}))

const router = express.Router()
app.use(router)
app.use('/api', routes)

const staticFiles = express.static(path.join(__dirname, '../../client/build'))
app.use(staticFiles)
app.use('/*', staticFiles)

app.set('port', (process.env.PORT || 3001))
app.listen(app.get('port'), () => {
  console.log(`Listening on ${app.get('port')}`)
})

