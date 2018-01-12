const html = require('choo/html')
const classnames = require('classnames')

function wrapper (view) {
  return function (state, emit) {
    return html`
      <body>
        <h1 id='top'>Kelsey Lim</h1>
        ${view(state, emit)}
        <h1 id='bottom'>Kelsey Lim</h1>
      </body>
    `
  }
}


module.exports = wrapper
