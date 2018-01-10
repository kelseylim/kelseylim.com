const html = require('choo/html')
const classnames = require('classnames')

function wrapper (view) {
  return function (state, emit) {
    return html`
      <body>
        ${view(state, emit)}
      </body>
    `
  }
}


module.exports = wrapper
