const express = require('express')

const routes = express.Router()

const authMiddleware = require('./middlewares/auth')

const controllers = require('./controllers')

routes.post('/check', controllers.UserController.checkUser)
routes.post('/users', controllers.UserController.store)
routes.post('/sessions', controllers.SessionController.store)


routes.use(authMiddleware)

routes.get('/starred', controllers.TagController.index)
routes.post('/tag', controllers.TagController.store)

module.exports = routes;
