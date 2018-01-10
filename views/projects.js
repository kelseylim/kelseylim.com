var html = require('choo/html')
var wrapper = require('../components/wrapper')

var TITLE = '🚂🚋🚋'

module.exports = wrapper(view)

function view (state, emit) {
  if (state.title !== TITLE) emit(state.events.DOMTITLECHANGE, TITLE)

  return html`
    <div class="sans-serif">
  projects
    </div>
  `

  function handleClick () {
    emit('clicks:add', 1)
  }
}
