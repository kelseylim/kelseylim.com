var html = require('choo/html')

var TITLE = 'Kelsey Lim - 404'

function noMatch (state, emit) {
  if (state.title !== TITLE) emit(state.events.DOMTITLECHANGE, TITLE)
  return html`
    <div id='noMatch'>
      <h1>No Route Found</h1>
    </div>
  `
}

module.exports = noMatch
