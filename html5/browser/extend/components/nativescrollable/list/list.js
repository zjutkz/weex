'use strict'

import scrollableModule from '../scrollable'

const availableChildrenTypes = ['cell', 'loading', 'refresh']

let Scrollable

const proto = {
  create () {
    const node = Scrollable.prototype.create.call(this)
    node.classList.add('weex-list')
    return node
  },

  createChildren () {
    const children = this.data.children || []
    children.forEach(function (data) {
      const type = data.type
      if (availableChildrenTypes.indexOf(type) === -1) {
        // throw new Error('[h5-render] invalid child type "'
        //   + type + '" for list.')
        console.warn(`[h5-render] invalid child type '${type}' for list.`)
      }
    })
    return Scrollable.prototype.createChildren.call(this)
  },

  appendChild (data) {
    const type = data.type
    if (availableChildrenTypes.indexOf(type) === -1) {
      // throw new Error('[h5-render] invalid child type "'
      //   + type + '" for list.')
      console.warn(`[h5-render] invalid child type '${type}' for list.`)
    }
    return Scrollable.prototype.appendChild.call(this, data)
  },

  insertBefore (child, before) {
    const type = child.data.type
    if (availableChildrenTypes.indexOf(type) === -1) {
      // throw new Error('[h5-render] invalid child type "'
      //   + type + '" for list.')
      console.warn(`[h5-render] invalid child type '${type}' for list.`)
    }
    return Scrollable.prototype.insertBefore.call(this, child, before)
  }
}

function init (Weex) {
  Scrollable = scrollableModule.init(Weex)
  const extend = Weex.utils.extend

  function List (data, nodeType) {
    Scrollable.call(this, data, nodeType)
  }

  List.prototype = Object.create(Scrollable.prototype)
  extend(List.prototype, proto)

  return List
}

export default { init }
