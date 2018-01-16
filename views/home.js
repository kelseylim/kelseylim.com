const html = require('choo/html')
const Hammer = require('hammerjs')
const { projects, about } = require('./sections')

const scrollThreshold = 30
const name = 'KELSEY LIM'

function home (state, emit) {
  if (state.currentSection === 'PROJECTS') emit(state.events.DOMTITLECHANGE, 'Kelsey Lim - Projects')
  if (state.currentSection === 'ABOUT') emit(state.events.DOMTITLECHANGE, 'Kelsey Lim - About')

  const slides = state.sections.map(key => key === 'PROJECTS' ? projects(state, emit) : about(state, emit))
  const classNames = state.classNames.join(' ')
  const loadClassNames = state.isLoading ? 'loadingOn' : 'loadingOff'

  return html`
    <body>
      <div class='overlay ${loadClassNames}'></div>
      <h1 id='top'>${name}</h1>
      <div id="scrollContainer" class=${classNames} onwheel=${handleScroll}>
        ${slides}
      </div>
      <h1 id='bottom'>${name}</h1>
    </body>
  `

  function handleScroll(event) {
    event.preventDefault()
    if (!state.latch) {
      event.wheelDeltaY > 0 + scrollThreshold ? emit('shiftDown') : null
      event.wheelDeltaY < 0 - scrollThreshold ? emit('shiftUp') : null
    }
  }
}

module.exports = home
