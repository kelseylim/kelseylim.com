const html = require('choo/html')
const Hammer = require('hammerjs')
const { projects, about } = require('./sections')

const NAME = 'KELSEY LIM'
// hi kelsey

function home (state, emit) {
  if (state.currentSection === 'PROJECTS') emit(state.events.DOMTITLECHANGE, 'Kelsey Lim - Projects')
  if (state.currentSection === 'ABOUT') emit(state.events.DOMTITLECHANGE, 'Kelsey Lim - About')

  const sections = state.sections.map((key, i) => key === 'PROJECTS'
    ? projects(state, emit, i)
    : about(state, emit, i))

  const classNames = state.classNames.join(' ')
  const loadClassNames = state.isLoaded ? 'loadingOff' : 'loadingOn'

  return html`
    <body>
      <div class='overlay ${loadClassNames}'></div>
      <h1 id='top'>${NAME}</h1>
      <div
        id="scrollContainer"
        class=${classNames}
        onwheel=${handleScroll}
        ontouchmove=${handleTouchMove}
        ontouchstart=${handleTouchStart}>
        ${sections}
      </div>
      <h1 id='bottom'>${NAME}</h1>
    </body>
  `

  function handleTouchMove(event) {
    event.preventDefault()
    emit('handleTouchMove', event)
  }

  function handleTouchStart(event) {
    event.preventDefault()
    emit('handleTouchStart', event)
  }

  function handleScroll(event) {
    event.preventDefault()
    emit('handleScroll', event)
  }

}

module.exports = home
