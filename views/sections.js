var html = require('choo/html')

function projects (state, emit) {
  return html`
    <section id='projects'>projects</section>
  `
}

function about (state, emit) {
  return html`
    <section id='about'>about</section>
  `
}

module.exports = {
  projects,
  about
}
