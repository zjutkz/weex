'use strict'

import scrollableModule from '../scrollable'

function init (Weex) {
  const Scrollable = scrollableModule.init(Weex)
  const extend = Weex.utils.extend

  function Scroller (data, nodeType) {
    Scrollable.call(this, data, nodeType)
  }

  Scroller.prototype = Object.create(Scrollable.prototype)
  extend(Scroller.prototype, {
    create () {
      const node = Scrollable.prototype.create.call(this)
      node.classList.add('weex-scroller')
      return node
    }
  })

  Weex.registerComponent('scroller', Scroller)
}

export default { init }
