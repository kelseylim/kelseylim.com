require('babel-register')({
  plugins: ['markdown']
})

const css = require('sheetify')
const choo = require('choo')
const store = require('./stores/store')

const home = require('./views/home')
const noMatch = require('./views/noMatch')

css('./styles/index.css')

const app = choo()

if (process.env.NODE_ENV !== 'production') {
  app.use(require('choo-devtools')())
}

app.use(store)
app.route('/', home)
app.route('/*', noMatch)

if (!module.parent) app.mount('body')
else module.exports = app
