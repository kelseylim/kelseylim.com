const html = require('choo/html')
const marked = require('marked')
const renderer = new marked.Renderer()

renderer.link = function( href, title, text ) {
  return '<a target="_blank" href="'+ href +'" title="' + title + '">' + text + '</a>';
}

const raw = require('bel/raw')
const projectList = require('../routes/projects')
const bio = markdown.require('../routes/bio.md')

function projects (state, emit) {
  const projectListDOM = projectList.map((p, i) => {
    const className = i === state.loopIndex ? 'show' : 'hide'
    return slide(p, className, emit)
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
          <p>Kelsey Lim is an independent designer and art director based in NYC. She makes books, websites, packaging, illustrations, brand identities, apps, and other things. Select clients include Condé Nast, Google, Refinery29, and NOWNESS.</p>
          <p class='info'>KELSEY.S.LIM@GMAIL.COM</p>
          <p class='info'><a href="https://www.instagram.com/kelseylim/" target="_blank">INSTAGRAM</a></p>
          <p class='copyright'>© 2017 KELSEY LIM.</p>
        </div>
      </span>
    </section>
  `
}

function slide (project, className, emit) {
  return html`
    <span class='slide ${className}'>
      <div class='wrapper'>
        <img onmouseenter=${handlePause} onmouseleave=${handlePlay} src='assets/images/${project.src}' />
        ${ makeMarkdown(project.cap) }
      </div>
    </span>
  `
  function handlePause () {
    emit('pause')
  }

  function handlePlay () {
    emit('play')
  }
}

function makeMarkdown (md) {
  let el = document.createElement('div')
  el.className = 'caption'
  el.innerHTML = marked(md, { renderer:renderer })
  return el
}

module.exports = {
  projects,
  about
}
