var html = require('choo/html')
var wrapper = require('../components/wrapper')

var TITLE = 'Kelsey Lim - 404'

module.exports = wrapper(view)

function view (state, emit) {
  if (state.title !== TITLE) emit(state.events.DOMTITLECHANGE, TITLE)
  return html`
    <div id='noMatch'>
      <h1>No Route Found</h1>
    </div>
  `
}
