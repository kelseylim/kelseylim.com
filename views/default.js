var html = require('choo/html')
var wrapper = require('../components/wrapper')

var TITLE = 'default, whoops'

module.exports = wrapper(view)

function view (state, emit) {
  if (state.title !== TITLE) emit(state.events.DOMTITLECHANGE, TITLE)

  return html`
    <div class="sans-serif">
      default
    </div>
  `

  function handleClick () {
    emit('clicks:add', 1)
  }
}
