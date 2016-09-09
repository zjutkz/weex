'use strict'

import './loading.css'
// const parents = ['scroller', 'list', 'vlist']

const DEFAULT_CLAMP = 130
const DEFAULT_ALIGN_ITEMS = 'center'
const DEFAULT_JUSTIFY_CONTENT = 'center'

function getScrollHandler (loading) {
  if (!getScrollHandler._h) {
    getScrollHandler._h = function (e) {
      const ct = e.target
      const offset = loading.node.offsetTop - ct.getBoundingClientRect().height
      console.log(loading.isAvailableToLoadMore)
      if (ct.scrollTop > offset && loading.isAvailableToLoadMore) {
        loading.dispatchEvent('loading')
        loading.isAvailableToLoadMore = false
      }
      else {
        loading.isAvailableToLoadMore = true
      }
    }
  }
  return getScrollHandler._h
}

const proto = {
  create () {
    const node = document.createElement('div')
    node.classList.add('weex-container', 'weex-loading')
    return node
  },

  onAppend () {
    const parent = this.getParent()
    parent.node.addEventListener('scroll', getScrollHandler(this))
  },

  onRemove () {
    const parent = this.getParent()
    parent.node.removeEventListener('scroll', getScrollHandler(this))
  }
}

const attr = {
  display: function (val) {
    if (val === 'show') {
      this.node.style.visibility = 'visible'
      return
    }
    if (val === 'hide') {
      this.node.style.visibility = 'hidden'
      return
    }
    console.error(`[h5-render] attr 'display' of <refresh>': value ${val} is invalid. Should be 'show' or 'hide'.`)
  }
}

function init (Weex) {
  const Component = Weex.Component
  const extend = Weex.utils.extend

  function Loading (data) {
    const height = (data.style || {}).height
    !height && height !== 0 && (data.style.height = DEFAULT_CLAMP)
    !data.style.alignItems && (data.style.alignItems = DEFAULT_ALIGN_ITEMS)
    !data.style.justifyContent
      && (data.style.justifyContent = DEFAULT_JUSTIFY_CONTENT)
    this.isAvailableToLoadMore = true
    Component.call(this, data)
  }
  Loading.prototype = Object.create(Component.prototype)
  extend(Loading.prototype, proto)
  extend(Loading.prototype, { attr })

  Weex.registerComponent('loading', Loading)
}

export default { init }
