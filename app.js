const express = require('express')
const router = require('./routes')
const models = require('./models')
const bodyParser = require('body-parser')
const path = require('path')
const nunjucks = require('nunjucks')

const port = 3000
const app = express()

const env = nunjucks.configure('views', { noCache: true})

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.set('view engine', 'html')
app.engine('html', nunjucks.render)

// Promise.all([models.User.sync({ force: true }), models.Page.sync({ force: true })]).then(function() {
Promise.all([models.User.sync(), models.Page.sync()]).then(function() {
  app.listen(port, function() {
    console.log('Server is listening on port', port, '...')
  })
}).catch(console.error)

app.use('/', router)
app.use(express.static(path.join(__dirname, 'public')))
