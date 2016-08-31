'use strict'

import './refresh.css'

// no support for refresh component.

const proto = {
  create () {
    const node = document.createElement('div')
    node.classList.add('weex-container', 'weex-refresh')
    node.style.display = 'none'
    return node
  }
}

const style = {
  display: function (val) {
    return console.warn('[h5-render] doesn\'t support style display of refresh component.')
  }
}

function init (Weex) {
  const Component = Weex.Component
  const extend = Weex.utils.extend

  function Refresh (data) {
    Component.call(this, data)
  }
  Refresh.prototype = Object.create(Component.prototype)
  extend(Refresh.prototype, proto)
  extend(Refresh.prototype, {
    style: extend(Object.create(Component.prototype.style), style)
  })

  Weex.registerComponent('refresh', Refresh)
}

export default { init }

