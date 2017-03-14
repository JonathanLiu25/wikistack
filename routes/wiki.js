const express = require('express')
const models = require('../models')
const router = express.Router()
const Page = models.Page
const User = models.User

module.exports = router

router.get('/add', function(req, res, next) {
  res.render('addpage')
})

router.get('/:urlTitle', function(req, res, next) {
  Page.findOne({
    where: {
      urlTitle: req.params.urlTitle
    }
  }).then(function(result) {
    res.render('wikipage', { page: result })
  }).catch(next)
})

router.get('/', function(req, res, next) {
  res.redirect('/')
})

router.post('/', function(req, res, next) {
  let title = req.body.title
  let content = req.body.content
  let name = req.body.name
  let email = req.body.email

  let page = Page.build({
    title: title,
    content: content
  })

  let user = User.build({
    name: name,
    email: email
  })

  user.save()
  page.save().then(function(result) {
    res.redirect(result.route)
  })
})
