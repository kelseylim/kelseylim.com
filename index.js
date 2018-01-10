const css = require('sheetify')
const choo = require('choo')
const store = require('./stores/store')
const routes = require('./routes/index')

css('./styles/index.css')

var app = choo()
if (process.env.NODE_ENV !== 'production') {
  app.use(require('choo-devtools')())
} else {
  // Enable once you want service workers support. At the moment you'll
  // need to insert the file names yourself & bump the dep version by hand.
  // app.use(require('choo-service-worker')())
}

app.use(store)
app.use(mapRoutes)

// create the site structure
function mapRoutes (state, emitter) {
  state.routes = routes
  state.routes.map(r => app.route(r.path, r.component))
}

if (!module.parent) app.mount('body')
else module.exports = app
