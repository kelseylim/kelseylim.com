const html = require('choo/html')
const wrapper = require('../components/wrapper')
const lodash = require('lodash')
const Hammer = require('hammerjs')
const { projects, about } = require('./sections')

var TITLE = 'Kelsey Lim'
const scrollThreshold = 30
const transitionTime = 800

module.exports = wrapper(view)

function view (state, emit) {
  const slides = state.sections.map(key => key === 'PROJECTS' ? projects() : about())
  return html`
    <div id="scrollContainer" onwheel=${handleScroll}>
      ${slides}
    </div>
  `

  function handleScroll(event) {
    event.preventDefault()
    if (!state.latch) {
      emit('latchOn')
      event.wheelDeltaY > 0 + scrollThreshold ? emit('shiftUp') : null
      event.wheelDeltaY < 0 - scrollThreshold ? emit('shiftDown') : null
      window.setTimeout(resetLatch, transitionTime)
    }
  }

  function resetLatch() {
    emit('latchOff')
  }
}
