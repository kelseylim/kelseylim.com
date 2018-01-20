const { delay } = require('lodash')
const projectList = require('../routes/projects')

const scrollThreshold = 30
const sectionDelay = 1000
const debounceDelay = 100

function store (state, emitter) {
  state.sections = ['ABOUT', 'PROJECTS', 'ABOUT']
  state.classNames = [''],
  state.latch = false
  state.currentSection = 'PROJECTS'
  state.loopIndex = 0
  state.projectListLength = projectList.length
  state.isPaused = false
  state.isLoading = true
  state.touchOriginY = 0

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

  function pause () {
    state.isPaused = true
  }

  function play () {
    state.isPaused = false
  }

  function scrollDeltaGate(latch, offset, threshold) {
    if (!latch) {
      offset > 0 + threshold ? emitter.emit('shiftDown') : null
      offset < 0 - threshold ? emitter.emit('shiftUp') : null
    }
  }

  emitter.on('DOMContentLoaded', DOMContentLoaded)
  emitter.on('shiftUp', shiftUp)
  emitter.on('shiftDown', shiftDown)
  emitter.on('play', play)
  emitter.on('pause', pause)
  emitter.on('handleSlideEnter', handleSlideEnter)
  emitter.on('handleSlideExit', handleSlideExit)
  emitter.on('handleScroll', handleScroll)
  emitter.on('handleTouchMove', handleTouchMove)
  emitter.on('handleTouchStart', handleTouchStart)

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
      delay(() => state.latch = false, debounceDelay)
    }, sectionDelay)
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
      delay(() => state.latch = false, debounceDelay)
    }, sectionDelay)
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


  function handleTouchMove(event) {
    event.preventDefault()
    const touch = event.touches[0] || event.changedTouches[0]
    const offset = touch.pageY - state.touchOriginY
    scrollDeltaGate(state.latch, offset, scrollThreshold)
  }

  function handleTouchStart(event) {
    event.preventDefault()
    const touch = event.touches[0] || event.changedTouches[0]
    state.touchOriginY = touch.pageY
  }

  function handleScroll(event) {
    event.preventDefault()
    scrollDeltaGate(state.latch, event.wheelDeltaY, scrollThreshold)
  }

  function handleSlideEnter() {
    pause()
    emitter.emit('render')
  }

  function handleSlideExit() {
    play()
    emitter.emit('render')
  }

  function DOMContentLoaded () {
    window.setInterval(() => loop(), 500)
    delay(() => {
      emitter.emit('render')
      state.isLoading = false
    }, 500)
  }

}

module.exports = store
