const html = require('choo/html')
const Hammer = require('hammerjs')
const { projects, about } = require('./sections')


const name = 'KELSEY LIM'
// hi kelsey

function home (state, emit) {
  if (state.currentSection === 'PROJECTS') emit(state.events.DOMTITLECHANGE, 'Kelsey Lim - Projects')
  if (state.currentSection === 'ABOUT') emit(state.events.DOMTITLECHANGE, 'Kelsey Lim - About')

  const slides = state.sections.map(key => key === 'PROJECTS'
    ? projects(state, emit)
    : about(state, emit))

  const classNames = state.classNames.join(' ')
  const loadClassNames = state.isLoading ? 'loadingOn' : 'loadingOff'

  return html`
    <body>
      <div class='overlay ${loadClassNames}'></div>
      <h1 id='top'>${name}</h1>
      <div
        id="scrollContainer"
        class=${classNames}
        onwheel=${handleScroll}
        ontouchmove=${handleTouchMove}
        ontouchstart=${handleTouchStart}>
          ${slides}
      </div>
      <h1 id='bottom'>${name}</h1>
    </body>
  `

  function handleTouchMove(event) {
    emit('handleTouchMove', event)
  }

  function handleTouchStart(event) {
    emit('handleTouchStart', event)
  }

  function handleScroll(event) {
    emit('handleScroll', event)
  }

}

module.exports = home
