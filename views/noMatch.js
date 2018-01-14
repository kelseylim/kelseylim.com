var html = require('choo/html')
var wrapper = require('../components/wrapper')

var TITLE = 'Kelsey Lim - 404'

module.exports = wrapper(view)

function view (state, emit) {
  if (state.title !== TITLE) emit(state.events.DOMTITLECHANGE, TITLE)
  return html`
    <div class="sans-serif">
      <h1 class="f-headline pa3 pa4-ns">
        404 - route not found
      </h1>
      <a href="/" class="link black underline">
        Back to main
      </a>
    </div>
  `
}
