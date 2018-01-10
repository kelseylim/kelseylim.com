var html = require('choo/html')
var wrapper = require('../components/wrapper')

var TITLE = 'Kelsey Lim'
const scrollThreshhold = 40


module.exports = wrapper(view)

function view (state, emit) {
  const slides = state.sectionOrder.map(k => k === 'PROJECTS' ? projects() : about())
  console.log(state.sectionOrder)
  return html`
    <div id="scrollContainer" onwheel=${handleScroll}>
      ${slides}
    </div>
  `

  function handleScroll(event) {
    event.deltaY > 0 + scrollThreshhold ? emit('shiftUp') : null
    event.deltaY < 0 - scrollThreshhold ? emit('shiftDown') : null
  }
}

function projects (state, emit) {
  return html`
    <section>projects</section>
  `
}

function about (state, emit) {
  return html`
    <section>about</section>
  `
}
