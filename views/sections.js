const html = require('choo/html')
// const bio = markdown.require('../routes/bio.md')

function projects (state, emit) {
  const projectListDOM = state.projects.map((p, i) => {
    const style = i === state.loopIndex ? 'visibility: visible !important;' : null
    return slide(p, style, state, emit, i)
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

function slide (project, style, state, emit, index) {
  const imageURL = 'assets/' + project.src
  const captionStyle = state.isPaused ? 'opacity: 1 !important;' : null

  return html`
    <span id='slide-${index}' class='slide' style=${style}>
      <div class='slide-wrapper'>
        ${image(imageURL, emit, index)}
        <div id='caption-${index}' style=${captionStyle} class='caption'>${ project.cap }</div>
      </div>
    </span>
  `
}

function image(src, emit, index) {
  return html`
    <img
      id='img-${index}'
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

module.exports = {
  projects,
  about
}
