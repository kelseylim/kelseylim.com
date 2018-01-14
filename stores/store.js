const { delay } = require('lodash')
const projectList = require('../routes/projects')

function store (state, emitter) {
  state.sections = ['ABOUT', 'PROJECTS', 'ABOUT']
  state.classNames = [''],
  state.latch = false
  state.delay = 1000
  state.debounceDelay = 100
  state.currentSection = 'PROJECTS'
  state.loopIndex = 0
  state.projectListLength = projectList.length
  state.isPaused = false
  state.isLoading = true

  function dropLast(arr) {
    let result = [...arr]
    result.pop()
    return result
  }

  function dropFirst(arr) {
    let result = [...arr]
    result.shift()
    return result
  }

  function addAtFirst(arr, newItem) {
    let result = [...arr]
    result.unshift(newItem)
    return result
  }

  function addAtLast(arr, newItem) {
    return arr.concat(newItem)
  }

  emitter.on('DOMContentLoaded', DOMContentLoaded)
  emitter.on('shiftUp', shiftUp)
  emitter.on('shiftDown', shiftDown)
  emitter.on('play', play)
  emitter.on('pause', pause)

  function shiftUp () {
    state.latch = true
    state.classNames = ['moveUp']
    state.currentSection = state.sections[2]
    emitter.emit('render')
    delay(() => {
      state.sections = dropFirst(state.sections)
      state.sections = addAtLast(state.sections, state.sections[0])
      state.classNames = ['reset']
      emitter.emit('render')
      delay(() => state.latch = false, state.debounceDelay)
    }, state.delay)
  }

  function shiftDown () {
    state.latch = true
    state.classNames = ['moveDown']
    state.currentSection = state.sections[0]
    emitter.emit('render')
    delay(() => {
      state.sections = dropLast(state.sections)
      state.sections = addAtFirst(state.sections, state.sections[1])
      state.classNames = ['reset']
      emitter.emit('render')
      delay(() => state.latch = false, state.debounceDelay)
    }, state.delay)
  }

  function loop () {
    if (state.currentSection === 'PROJECTS' && !state.isPaused) {
      window.requestAnimationFrame(() => {
        if (state.loopIndex < state.projectListLength - 1) {
          state.loopIndex = state.loopIndex + 1
        } else {
          state.loopIndex = 0
        }
        emitter.emit('render')
      })
    }
  }

  function pause () {
    state.isPaused = true
    emitter.emit('render')
  }

  function play () {
    state.isPaused = false
    emitter.emit('render')
  }

  function DOMContentLoaded () {
    window.setInterval(() => loop(), 500)
    state.isLoading = false
    emitter.emit('render')
  }
}

module.exports = store
