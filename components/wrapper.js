const html = require('choo/html')
const classnames = require('classnames')

function wrapper (view) {
  return function (state, emit) {
    const loadClassNames = state.isLoading ? 'loadingOn' : 'loadingOff'
    return html`
      <body>
        <div class='overlay ${loadClassNames}'></div>
        <h1 id='top'>KELSEY LIM</h1>
        ${view(state, emit)}
        <h1 id='bottom'>KELSEY LIM</h1>
      </body>
    `
  }
}


module.exports = wrapper
