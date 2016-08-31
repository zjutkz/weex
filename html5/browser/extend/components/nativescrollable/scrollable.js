/* global lib */

'use strict'

import './scrollable.css'
// import 'animated-scrollto'

const directionMap = {
  h: ['row', 'horizontal', 'h', 'x'],
  v: ['column', 'vertical', 'v', 'y']
}

const meta = {
  scrollDirection: {
    h: ['left', 'right'],
    v: ['up', 'down']
  },
  scrollName: {
    h: 'scrollLeft',
    v: 'scrollTop'
  },
  scaleName: {
    h: 'width',
    v: 'height'
  }
}

const DEFAULT_DIRECTION = 'column'
const DEFAULT_LOAD_MORE_OFFSET = 0

const LAZYLOAD_THROTTLE = 400

let Component
let throttle

const proto = {
  create (nodeType) {
    const node = document.createElement(nodeType || 'div')
    node.classList.add(
      'weex-container',
      'weex-scrollable',
      'dir-' + this.direction
    )
    return node
  },

  bindEvents (evts) {
    Component.prototype.bindEvents.call(this, evts)
    const fireLazyload = this.fireLazyload.bind(this)
    this.node.addEventListener('scroll', function (e) {
      // fire lazyload for images.
      throttle(fireLazyload, LAZYLOAD_THROTTLE)()

      // fire loadmore event.
      const leftDist = Math.abs(
        this.node.getBoundingClientRect()[meta.scaleName[this.direction]]
        - this.node[meta.scrollName[this.direction]])
      if (leftDist <= this.loadmoreoffset && this.isAvailableToFireloadmore) {
        this.isAvailableToFireloadmore = false
        this.dispatchEvent('loadmore')
      }
      else if (leftDist > this.loadmoreoffset && !this.isAvailableToFireloadmore) {
        this.isAvailableToFireloadmore = true
      }
    }.bind(this))
  }
}

const attr = {
  loadmoreoffset (val) {
    const value = parseFloat(val)
    if (value < 0 || isNaN(value)) {
      console.warn(`[h5-render] invalid loadmoreoffset: ${val}`)
      return
    }
    this.loadmoreoffset = value
  }
}

const style = ['overflow', 'overflowX', 'overflowY'].reduce(function (prev, cur) {
  prev[cur] = function (val) {
    console.warn(`[h5-render] impossible to set style '${cur}' for scrollable component.`)
  }
  return prev
}, {})

const event = {
  scroll: {
    extra () {
      const curOffset = this.node[meta.scrollName]
      const dir = meta.scrollDirection[this.direction][curOffset > this.offset ? 0 : 1]
      this.offset = curOffset
      return {
        dir
      }
    }
  }
}

function init (Weex) {
  Component = Weex.Component
  throttle = Weex.utils.throttle
  const extend = Weex.utils.extend

  // attrs:
  //  - loadmoreoffset: updatable
  //  - scroll-direciton: none|vertical|horizontal (default is vertical)
  //  - show-scrollbar: true|false (default is true)
  function Scrollable (data, nodeType) {
    this.loadmoreoffset = DEFAULT_LOAD_MORE_OFFSET
    this.isAvailableToFireloadmore = true
    const attrs = data.attr || {}
    const direction = attrs.scrollDirection
      || attrs.direction
      || DEFAULT_DIRECTION
    this.direction = directionMap.h.indexOf(direction) === -1
      ? 'v'
      : 'h'
    this.showScrollbar = attrs.showScrollbar || true
    this.offset = 0
    Component.call(this, data, nodeType)
  }
  Scrollable.prototype = Object.create(Component.prototype)
  extend(Scrollable.prototype, proto)
  extend(Scrollable.prototype, { attr })
  extend(Scrollable.prototype, {
    style: extend(Object.create(Component.prototype.style), style)
  })
  return Scrollable
}

export default { init }
