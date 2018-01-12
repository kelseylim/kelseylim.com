const html = require('choo/html')
const wrapper = require('../components/wrapper')
const Hammer = require('hammerjs')
const { projects, about } = require('./sections')

const scrollThreshold = 30

module.exports = wrapper(view)

function view (state, emit) {
  if (state.currentSection === 'PROJECTS') emit(state.events.DOMTITLECHANGE, 'Kelsey Lim - Projects')
  if (state.currentSection === 'ABOUT') emit(state.events.DOMTITLECHANGE, 'Kelsey Lim - About')

  const slides = state.sections.map(key => key === 'PROJECTS' ? projects(state, emit) : about(state, emit))
  const classNames = state.classNames.join(' ')
  return html`
    <div id="scrollContainer" class=${classNames} onwheel=${handleScroll}>
      ${slides}
    </div>
  `

  function handleScroll(event) {
    event.preventDefault()
    if (!state.latch) {
      event.wheelDeltaY > 0 + scrollThreshold ? emit('shiftDown') : null
      event.wheelDeltaY < 0 - scrollThreshold ? emit('shiftUp') : null
    }
  }
}
