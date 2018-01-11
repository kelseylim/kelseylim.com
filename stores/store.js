
function store (state, emitter) {
  state.sections = ['ABOUT', 'PROJECTS', 'ABOUT']
  state.latch = false

  function swapTuple(arr) {
    return [arr[1], arr[0]]
  }

  function ifFirstItemIs(arr, key) {
    return arr[0] === key ? true : false
  }

  function invertTuple (arr) {
    const newArr = [arr[1], arr[2]]
    return newArr.concat(newArr[0])
  }

  emitter.on('DOMContentLoaded', DOMContentLoaded)
  emitter.on('shiftUp', shiftUp)
  emitter.on('shiftDown', shiftDown)
  emitter.on('latchOff', latchOff)
  emitter.on('latchOn', latchOn)


  function shiftUp () {
    state.sections = invertTuple(state.sections)
    emitter.emit('render')
  }

  function shiftDown () {
    state.sections = invertTuple(state.sections)
    emitter.emit('render')
  }

  function latchOn () {
    state.latch = true
  }

  function latchOff () {
    state.latch = false
  }

  function DOMContentLoaded () {
    return null
  }
}

module.exports = store
