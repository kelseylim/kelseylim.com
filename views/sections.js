const html = require('choo/html')
// const bio = markdown.require('../routes/bio.md')

function projects (state, emit, index) {
  const project = state.projects[state.loopIndex]
  return html`
    <section id='projects-${index}'>
      ${ state.isLoaded ? slide(state, emit, project) : null }
    </section>
  `
}

function about (state, emit, index) {
  return html`
    <section id='about-${index}'>
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

function slide (state, emit, project) {
  const captionClasses = state.isPaused ? 'caption showCaption' : 'caption : hideCaption'
  return html`
    <span id='slide-${project.key}' class='slide'>
      <div class='slide-wrapper'>
        <div
          onmouseenter=${handleSlideEnter}
          onmouseleave=${handleSlideExit}
          ontouchstart=${handleSlideTouchStart}
          ontouchend=${handleSlideTouchEnd}>
          ${project.img}
        </div>
        <div class='${captionClasses}'>${ project.cap }</div>
      </div>
    </span>
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

module.exports = {
  projects,
  about
}
