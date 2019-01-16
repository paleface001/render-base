(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else if(typeof exports === 'object')
		exports["engine-base"] = factory();
	else
		root["engine-base"] = factory();
})(typeof self !== 'undefined' ? self : this, function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

var Buffer = __webpack_require__(1);
var Shader = __webpack_require__(2);
var Program = __webpack_require__(3);

window.EngineBase = { Buffer: Buffer.default, Shader: Shader.default, Program: Program.default };

module.exports = EngineBase;

/***/ }),
/* 1 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Buffer = function () {
    function Buffer(gl, cfg) {
        _classCallCheck(this, Buffer);

        this.gl = gl;
        this.target = cfg.target;
        this.usage = cfg.usage;
        this.dataSetted = false;
        this._initialize(cfg);
    }

    Buffer.prototype._initialize = function _initialize(cfg) {
        this.buffer = this.gl.createBuffer();
        if (cfg.data) {
            this._setData(cfg.data);
        }
    };

    Buffer.prototype._setData = function _setData(data, offset) {
        this.bind();
        if (offset) {
            this.gl.bufferSubData(this.target, offset, data);
        } else {
            this.gl.bufferData(this.target, data, this.usage);
            this.dataSetted = true;
        }
        this.unbind();
    };

    Buffer.prototype.setData = function setData(opts) {
        if (opts.target) this.target = opts.target;
        if (opts.usage) this.usage = opts.usage;
        this._setData(opts.data);
    };

    Buffer.prototype.setSubData = function setSubData(data, offset) {
        if (this.dataSetted) {
            this._setData(data, offset);
        }
    };

    Buffer.prototype.bind = function bind() {
        this.gl.bindBuffer(this.target, this.buffer);
    };

    Buffer.prototype.unbind = function unbind() {
        this.gl.bindBuffer(this.target, null);
    };

    Buffer.prototype.destory = function destory() {
        this.gl.deleteBuffer(this.buffer);
    };

    return Buffer;
}();

/* harmony default export */ __webpack_exports__["default"] = (Buffer);

/***/ }),
/* 2 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Shader = function () {
    function Shader(gl, cfg) {
        _classCallCheck(this, Shader);

        this.gl = gl;
        this.type = cfg.type;
        this.source = cfg.source;
        this._initialize();
    }

    Shader.prototype._initialize = function _initialize() {
        this.shader = this.gl.createShader(this.type);
        this.gl.shaderSource(this.shader, this.source);
        this.gl.compileShader(this.shader);
        var success = this.gl.getShaderParameter(this.shader, gl.COMPILE_STATUS);
        if (!success) {
            throw 'shader compile error';
        }
    };

    Shader.prototype.destory = function destory() {
        this.gl.deleteShader(this.shader);
    };

    return Shader;
}();

/* harmony default export */ __webpack_exports__["default"] = (Shader);

/***/ }),
/* 3 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Program = function () {
    function Program(gl, cfg) {
        _classCallCheck(this, Program);

        this.gl = gl;
        this.vertexShader = cfg.vertexShader;
        this.fragmentShader = cfg.fragmentShader;
        this._initialize();
    }

    Program.prototype._initialize = function _initialize() {
        this.program = this.gl.createProgram();
        this.gl.attachShader(this.program, this.vertexShader);
        this.gl.attachShader(this.program, this.fragmentShader);
        this.gl.linkProgram(this.program);
        var sucess = gl.getProgramParameter(this.program, gl.LINK_STATUS);
        if (!sucess) {
            throw 'link shader failed';
        }
        this.gl.useProgram(this.program);
    };

    Program.prototype.setAttribute = function setAttribute(name, buffer, accessInfo) {
        var location = this._getAttribLocation(name);
        this.gl.enableVertexAttribArray(location);
        buffer.bind();
        this.gl.vertexAttribPointer(location, accessInfo.size, accessInfo.type, accessInfo.normalize, accessInfo.stride, accessInfo.offset);
        buffer.unbind();
    };

    Program.prototype.setUniform = function setUniform(name, type, value, length) {
        if (length > 4) {
            throw error;
        }
        var location = this._getUniformLocation(name);
        if (type === 'FLOAT') {
            this._setFloatUniform(location, value, length);
        }
        this._setIntUniform(location, value, length);
        this._setBooleanUniform(location, value, length);
    };

    Program.prototype.draw = function draw(opts) {
        if (opts.type && opts.type === 'indexed') {
            this.gl.drawElements(opts.drawMode, opts.count, opts.indexType, opts.offset);
        } else {
            this.gl.drawArrays(opts.drawMode, opts.offset, opts.count);
        }
    };

    Program.prototype.destory = function destory() {
        this.gl.deleteProgram(this.program);
    };

    Program.prototype._getAttribLocation = function _getAttribLocation(name) {
        return this.gl.getAttribLocation(this.program, name);
    };

    Program.prototype._getUniformLocation = function _getUniformLocation(name) {
        return this.gl.getUniformLocation(this.program, name);
    };

    Program.prototype._setFloatUniform = function _setFloatUniform(location, value, length) {
        if (length == 1) this.gl.uniform1fv(location, value);
        if (length == 2) this.gl.uniform2fv(location, value);
        if (length == 3) this.gl.uniform3fv(location, value);
        if (length == 4) this.gl.uniform4fv(location, value);
    };

    Program.prototype._setIntUniform = function _setIntUniform(location, value, length) {
        /*if(length == 1) this.gl.uniform1iv(location, value);
        if(length == 2) this.gl.uniform2iv(location, value);
        if(length == 3) this.gl.uniform3iv(location, value);
        if(length == 4) this.gl.uniform4iv(location, value);*/
    };

    Program.prototype._setBooleanUniform = function _setBooleanUniform() {};

    Program.prototype._setTextureUniform = function _setTextureUniform() {};

    return Program;
}();

/* harmony default export */ __webpack_exports__["default"] = (Program);

/***/ })
/******/ ]);
});
//# sourceMappingURL=engine-base.js.map