const express = require('express')
const wikiRouter = require('./wiki')
const models = require('../models')
const router = express.Router()
const Page = models.Page
const User = models.User

module.exports = router

router.use('/wiki', wikiRouter)

router.get('/', function(req, res, next) {
  Page.findAll().then(function(result) {
    res.render('index', { pages: result })
  }).catch(next)
})

router.get('/', function(req, res, next) {
  res.send('Here\'s a response')
})
