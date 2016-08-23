// { "framework": "Vue" }

/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	
	  module.exports = {
	    components: {
	      'example-list': __webpack_require__(1)
	    },
	    data: {
	      items: [
	        // `name` key is the example filename without '.vue'
	        {name: 'vue/syntax/hello-world', title: 'Hello World'},
	        {name: 'vue/showcase/itemlist', title: 'List'},
	        {name: 'vue/showcase/calculator', title: 'Calculator'},
	        {name: 'vue/showcase/new-fashion', title: 'Activity Page'}
	      ]
	    }
	  }

	module.exports.render = function() {with(this){return _h('example-list',{attrs:{"items":items},staticAttrs:{"dir":"examples"}})}}
	module.exports.el = "body"
	new Vue(module.exports)


/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	
	  module.exports = {
	    components: {
	      'example-list-item': __webpack_require__(2)
	    },
	    props: {
	      dir: {
	        default: 'examples'
	      }, // examples, test ...
	      items: {
	        default: [
	          {name: 'hello', title: 'Hello World', url: ''}
	        ]
	      }
	    },
	    created: function() {
	      var bundleUrl = this.$getConfig().bundleUrl;
	      console.log('hit', bundleUrl);
	      var nativeBase;
	      var isAndroidAssets = bundleUrl.indexOf('your_current_IP') >= 0;
	      var isiOSAssets = bundleUrl.indexOf('file:///') >= 0 && bundleUrl.indexOf('WeexDemo.app') > 0;
	      if (isAndroidAssets) {
	        nativeBase = 'file://assets/';
	      }
	      else if (isiOSAssets) {
	        // file:///var/mobile/Containers/Bundle/Application/{id}/WeexDemo.app/
	        // file:///Users/{user}/Library/Developer/CoreSimulator/Devices/{id}/data/Containers/Bundle/Application/{id}/WeexDemo.app/
	        nativeBase = bundleUrl.substring(0, bundleUrl.lastIndexOf('/') + 1);
	      }
	      else {
	        var host = 'localhost:12580';
	        var matches = /\/\/([^\/]+?)\//.exec(this.$getConfig().bundleUrl);
	        if (matches && matches.length >= 2) {
	          host = matches[1];
	        }
	        nativeBase = '//' + host + '/' + this.dir + '/build/';
	      }
	      var h5Base = './index.html?page=./' + this.dir + '/build/';
	      // in Native
	      var base = nativeBase;
	      if (typeof window === 'object') {
	        // in Browser or WebView
	        base = h5Base;
	      }

	      for (var i in this.items) {
	        var item = this.items[i];
	        if (!item.url) {
	          item.url = base + item.name + '.js';
	        }
	      }
	      // see log in Android Logcat
	      if (this.items.length) console.log('hit', this.items[0].url);
	    }
	  }

	module.exports.render = function() {with(this){return _h('list',[(items)&&_l((items),function(item){return _h('cell',{staticAttrs:{"append":"tree"}},[_h('example-list-item',{attrs:{"title":item.title,"url":item.url}})])})])}}
	delete module.exports.el


/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	
	  var event = __weex_require_module__('event')
	  module.exports = {
	    components: {
	      'wxc-list-item': __webpack_require__(3)
	    },
	    props: {
	      title: {
	        default: '456'
	      },
	      url: {
	        default: ''
	      }
	    },
	    methods: {
	      redirect: function() {
	        event.openURL(this.url)
	      }
	    }
	  }

	module.exports.style = {
	  "item-txt": {
	    "fontSize": 48,
	    "color": "#555555"
	  }
	}
	module.exports.render = function() {with(this){return _h('wxc-list-item',{on:{"click":redirect}},function(){return [_h('text',{staticClass:["item-txt"]},[_s(title)])]})}}
	delete module.exports.el


/***/ },
/* 3 */
/***/ function(module, exports) {

	
	  module.exports = {
	    data: function () {
	      return {
	        bgColor: '#ffffff'
	      }
	    },
	    methods: {
	      click: function () {
	        this.$emit('click')
	      },
	      touchstart: function() {
	        // FIXME android touch
	        // TODO adaptive opposite bgColor
	        // this.bgColor = '#e6e6e6';
	      },
	      touchend: function() {
	        // FIXME android touchend not triggered
	        // this.bgColor = '#ffffff';
	      }
	    }
	  }

	module.exports.style = {
	  "item": {
	    "paddingTop": 25,
	    "paddingBottom": 25,
	    "paddingLeft": 35,
	    "paddingRight": 35,
	    "height": 160,
	    "justifyContent": "center",
	    "borderBottomWidth": 1,
	    "borderColor": "#dddddd"
	  }
	}
	module.exports.render = function() {with(this){return _h('div',{staticClass:["item"],style:{'background-color': bgColor},on:{"click":click,"touchstart":touchstart,"touchend":touchend}},[$slots["default"]])}}
	delete module.exports.el


/***/ }
/******/ ]);