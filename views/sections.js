const html = require('choo/html')
const marked = require('marked')
const renderer = new marked.Renderer()

renderer.link = function( href, title, text ) {
  return '<a target="_blank" href="'+ href +'" title="' + title + '">' + text + '</a>'
}

const raw = require('bel/raw')
const projectList = require('../routes/projects')
// const bio = markdown.require('../routes/bio.md')

function projects (state, emit) {
  const projectListDOM = projectList.map((p, i) => {
    const className = i === state.loopIndex ? 'show' : 'hide'
    return slide(p, className, state, emit)
  })
  return html`
    <section id='projects'>
      ${ projectListDOM }
    </section>
  `
}

function about (state, emit) {
  return html`
    <section id='about'>
      <span class='about-slide'>
        <div class='about-content'>
          <p>Kelsey Lim is an independent designer and art director based in NYC. She makes books, websites, packaging, illustrations, brand identities, apps, and other things. Select clients include Condé Nast, Google, Refinery29, and Man Repeller.</p>
          <div class='about-contact'>
          <p class='info'>KELSEY.S.LIM@GMAIL.COM</p>
          <p class='info'><a href="https://www.instagram.com/kelseylim/" target="_blank">INSTAGRAM</a></p>
          <p class='copyright'>© 2018 KELSEY LIM.</p>
          </div>
        </div>
      </span>
    </section>
  `
}

function slide (project, className, state, emit) {
  const captionContainerClass = state.isPaused ? 'showCaption caption' : 'hideCaption caption'
  const imageURL = 'assets/' + project.src
  return html`
    <span class='slide ${className}'>
      <div class='slide-wrapper'>
        ${image(imageURL, emit)}
        <div class=${captionContainerClass}>${ makeMarkdown(project.cap) }</div>
      </div>
    </span>
  `
}

function image(src, emit) {
  return html`
    <img
      class='slide-img'
      onmouseenter=${handleSlideEnter}
      onmouseleave=${handleSlideExit}
      ontouchstart=${handleSlideTouchStart}
      ontouchend=${handleSlideTouchEnd}
      src='${src}' />
  `
  function handleSlideTouchStart (event) {
    event.preventDefault()
    emit('handleSlideEnter')
  }

  function handleSlideTouchEnd (event) {
    event.preventDefault()
    emit('handleSlideExit')
  }

  function handleSlideEnter (event) {
    event.preventDefault()
    emit('handleSlideEnter')
  }

  function handleSlideExit(event) {
    event.preventDefault()
    emit('handleSlideExit')
  }
}

function makeMarkdown (md) {
  let el = document.createElement('div')
  el.className = 'innerCaption'
  el.innerHTML = marked(md, { renderer:renderer })
  return el

}

module.exports = {
  projects,
  about
}
