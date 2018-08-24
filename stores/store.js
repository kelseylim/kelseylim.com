const mar = require('marked')
const html = require('choo/html')

const bel = require('bel')
const raw = require('choo/html/raw')

const PROJECT_LIST = require('../routes/projects')

const SCROLL_THRESH = 30
const SECTION_DELAY = 1000
const DEBOUNCE_DELAY = 100
const SLIDE_DUR = 500


const renderer = new mar.Renderer()
renderer.link = function( href, title, text ) {
  return '<a target="_blank" href="'+ href +'" title="' + title + '">' + text + '</a>'
}

function store (state, emitter) {
  state.projects = []
  state.sections = ['ABOUT', 'PROJECTS', 'ABOUT']
  state.classNames = [''],
  state.latch = false
  state.currentSection = 'PROJECTS'
  state.loopIndex = 0
  state.totalProjects = 0
  state.loadedImages = 0
  state.isPaused = false
  state.isLoaded = false
  state.touchOriginY = 0

  const setState = o => {
    state = Object.assign(state, o)
    emitter.emit('render')
  }

  const dropLast = a => {
    let r = [...a]
    r.pop()
    return r
  }

  const dropFirst = a => {
    let r = [...a]
    r.shift()
    return r
  }

  const prepend = (a, n) => {
    let r = [...a]
    r.unshift(n)
    return r
  }

  const concat = (a, n) => a.concat(n)

  const pause = () => setState({isPaused:true})

  const play = () => setState({isPaused:false})

  function deltaGate(latch, offset, threshold) {
    if (!latch) {
      offset > 0 + threshold ? emitter.emit('shiftDown') : () => {}
      offset < 0 - threshold ? emitter.emit('shiftUp') : () => {}
    }
  }

  const len = a => a.length

  const up = a => {
    const b = dropFirst(a)
    return concat(b, b[0])
  }

  const down = a => {
    const b = dropLast(a)
    return prepend(b, b[1])
  }

  const parseMarkdown = md => html`
    <div class='innerCaption'>
      ${raw(mar(md, { renderer:renderer }))}
    </div>`


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
    setState({
      latch: true,
      classNames: ['moveUp'],
      currentSection: state.sections[2]
    })
    setTimeout(() => {

      setState({
        sections: up(state.sections),
        classNames: ['reset']
      })

      setTimeout(() => setState({latch:false}), DEBOUNCE_DELAY)
    }, SECTION_DELAY)
  }

  function shiftDown () {
    setState({
      latch: true,
      classNames: ['moveDown'],
      currentSection: state.sections[0]
    })
    setTimeout(() => {

      setState({
        sections: down(state.sections),
        classNames: ['reset']
      })

      setTimeout(() => setState({latch:false}), DEBOUNCE_DELAY)
    }, SECTION_DELAY)
  }

  function loop () {
    setTimeout(() => {
        const { currentSection, isPaused, loopIndex, totalProjects } = state
        window.requestAnimationFrame(loop)
        if (currentSection === 'PROJECTS' && !isPaused) {
          if (loopIndex < totalProjects - 1) {
            setState({loopIndex: loopIndex + 1})
          } else {
            setState({loopIndex: 0})
          }
       }
    }, SLIDE_DUR)
  }


  function handleTouchMove(e) {
    const touch = e.touches[0] || e.changedTouches[0]
    const offset = touch.pageY - state.touchOriginY
    deltaGate(state.latch, offset, SCROLL_THRESH)
  }

  function handleTouchStart(e) {
    const touch = e.touches[0] || e.changedTouches[0]
    setState({ touchOriginY: touch.pageY })
  }

  function handleScroll(e) {
    deltaGate(state.latch, e.wheelDeltaY, SCROLL_THRESH)
  }

  function handleSlideEnter() {
    pause()
  }

  function handleSlideExit() {
    play()
  }


  function DOMContentLoaded () {
    Promise.all(initialize(PROJECT_LIST)).then(projects => {
      setState({ projects, isLoaded: true })
      requestAnimationFrame(() => loop())
    })
  }


  function initialize(projectList) {
    return projectList.map(p => {
      return preloadImage(p.src)
        .then(img => {
          setState({totalProjects: state.totalProjects + 1})
        return {
          img: img,
          cap: parseMarkdown(p.cap),
        }
      }).catch((img) => console.error('uh oh could not load img', img))
    })
  }


  function preloadImage(src) {
    return new Promise((resolve, reject) => {
      const img = new Image()
      img.onload = () => resolve(img)
      img.onerror = () => reject(img)
      img.src = 'assets/' + src
      img.className = 'slide-img'
    })
  }

}

module.exports = store
