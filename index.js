require('babel-register')({
  plugins: [
    'markdown',
    ["transform-object-rest-spread", { "useBuiltIns": true }]
]
})

require('viewport-units-buggyfill').init()

const css = require('sheetify')
const choo = require('choo')
const store = require('./stores/store')

css('./styles/index.css')

const app = choo()

if (process.env.NODE_ENV !== 'production') {
  app.use(require('choo-devtools')())
} else {
  app.use(require('choo-service-worker')())
}

app.use(store)
app.route('/', require('./views/home'))
app.route('/*', require('./views/noMatch'))

if (!module.parent) app.mount('body')
else module.exports = app
