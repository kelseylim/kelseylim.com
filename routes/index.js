// IMPORT COMPONENTS
const homeComponent = require('../views/home')
const noMatchComponent = require('../views/noMatch')

// IMPORT CONTENT
const me = require('./me.js')
const projects = require('./projects.js')

const homePage = {
  path: '/',
  type: 'MAIN_ROUTE',
  title: 'Kelsey Lim',
  key: 'ROUTE_HOME',
  component: homeComponent,
}

const noMatchPage = {
  path: '/*',
  type: 'NOMATCH',
  title: '404',
  key: 'ROUTE_NOMATCH',
  component: noMatchComponent,
}

const routes = [homePage, noMatchPage]

module.exports = routes
