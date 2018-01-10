const Hammer = require('hammerjs')

module.exports = store



function store (state, emitter) {
  state.sectionOrder = ['PROJECTS', 'BIO']

  function tupleSwap(arr) {
    const revArr = [arr[1], arr[0]]
    console.log(arr, revArr)
    return revArr
  }

  function shiftUp () {
    console.log()
    // state.sectionOrder = tupleSwap(state.sectionOrder)
    state.sectionOrder = ['PROJECTS', 'BIO']
    emitter.emit('render')
  }

  function shiftDown () {
    // state.sectionOrder = tupleSwap(state.sectionOrder)
    state.sectionOrder = ['BIO', 'PROJECTS']
    emitter.emit('render')
  }

  emitter.on('DOMContentLoaded', function () {
    // const scrollContainer = document.getElementById('scrollContainer')
    // const hammertime = new Hammer(scrollContainer)
    // hammertime.on('pan', function(ev) {
    // 	console.log(ev)
    // })
  })
  // emitter.on('handleScroll', handleScroll)
}
