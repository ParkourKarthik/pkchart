var pkchart =
/******/ (function(modules) { // webpackBootstrap
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
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
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
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/pkchart.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/core.ts":
/*!*********************!*\
  !*** ./src/core.ts ***!
  \*********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var pkchart = function (container, params) {
    // Prevent library to be run in Node env:
    if (typeof window === 'undefined')
        return;
    // no real world use of the below promise for now.. (as it just adds a simple element)
    // return new Promise<any>((resolve, reject) => {
    //let promise = {resolve, reject};
    var cs = new CoreClass(container, params);
    // Initialize(container, params);
    // });
};
var CoreClass = /** @class */ (function () {
    function CoreClass(container, params) {
        this.initialize(container, params);
    }
    CoreClass.prototype.initialize = function (container, params) {
        var chartElem = '<figure>' +
            '<figcaption>' + params.config.caption + '</figcaption>' +
            '<svg class="pk-chart" width="420" height="150" aria-labelledby="title desc" role="img">' +
            '<title id="title">' + params.config.title + '</title>';
        var rectY = 20;
        var txtY = rectY + 9;
        params.data.forEach(function (element) {
            var bar = '<g class="bar">' +
                '<rect width="' + element.XValue.toString() + '" height="19" y="' + rectY.toString() + '"></rect>' +
                '<text x="' + (element.XValue + 5).toString() + '" y="' + txtY.toString() + '" dy=".35em">' + element.Label + '</text>' +
                '</g>';
            txtY += 20;
            rectY += 20;
            chartElem = chartElem + bar;
        });
        chartElem = chartElem + '</svg>' +
            '</figure>';
        var chartNode = this.convertToNodes(chartElem);
        container.innerHTML = chartElem;
    };
    CoreClass.prototype.convertToNodes = function (xmlString) {
        var nodes = new DOMParser();
        var doc = nodes.parseFromString(xmlString, "text/xml");
        return doc.firstChild ? doc.firstChild : new Node();
    };
    return CoreClass;
}());
var Initialize = function (elem, params) {
    //since the library is meant to be used directly in js, it is better to check the types explicitly at runtime
    if (!(elem instanceof HTMLElement)) {
        console.log('Initialize:not a valid HTMLElement');
        return;
    }
    //add a simple svg element
    var svg = document.createElement('svg');
    svg.setAttribute('width', (420).toString());
    svg.setAttribute('height', (150).toString());
    svg.setAttribute('role', 'img');
    for (var i = 0; i < Object.keys(params.data).length; i++) {
        var g = document.createElement('g');
        var rect = document.createElement('rect');
        rect.setAttribute('width', (10 * params.data[i].XValue).toString());
        rect.setAttribute('height', (20).toString());
        rect.setAttribute('y', (i * 2 * 10).toString());
        g.appendChild(rect);
        var txt = document.createElement('text');
        txt.setAttribute('x', ((10 * params.data[i].XValue) + 1).toString());
        txt.setAttribute('y', ((i * 2 * 10) + 8).toString());
        txt.style.border = '1px solid';
        txt.textContent = params.data[i].Label;
        g.appendChild(txt);
        svg.appendChild(g);
    }
    elem.appendChild(svg);
};
var ChartType;
(function (ChartType) {
    ChartType[ChartType["Bar"] = 0] = "Bar";
    ChartType[ChartType["Line"] = 1] = "Line";
    ChartType[ChartType["Cylinder"] = 2] = "Cylinder";
    ChartType[ChartType["Pie"] = 3] = "Pie";
})(ChartType || (ChartType = {}));
var ColorType;
(function (ColorType) {
    ColorType[ColorType["Contrast"] = 0] = "Contrast";
    ColorType[ColorType["Professional"] = 1] = "Professional";
})(ColorType || (ColorType = {}));
exports.default = pkchart;


/***/ }),

/***/ "./src/pkchart.js":
/*!************************!*\
  !*** ./src/pkchart.js ***!
  \************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var pkchart = __webpack_require__(/*! ./core */ "./src/core.ts").default;
  
module.exports = pkchart;
  

/***/ })

/******/ });
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9wa2NoYXJ0L3dlYnBhY2svYm9vdHN0cmFwIiwid2VicGFjazovL3BrY2hhcnQvLi9zcmMvY29yZS50cyIsIndlYnBhY2s6Ly9wa2NoYXJ0Ly4vc3JjL3BrY2hhcnQuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLGtEQUEwQyxnQ0FBZ0M7QUFDMUU7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxnRUFBd0Qsa0JBQWtCO0FBQzFFO0FBQ0EseURBQWlELGNBQWM7QUFDL0Q7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGlEQUF5QyxpQ0FBaUM7QUFDMUUsd0hBQWdILG1CQUFtQixFQUFFO0FBQ3JJO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsbUNBQTJCLDBCQUEwQixFQUFFO0FBQ3ZELHlDQUFpQyxlQUFlO0FBQ2hEO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLDhEQUFzRCwrREFBK0Q7O0FBRXJIO0FBQ0E7OztBQUdBO0FBQ0E7Ozs7Ozs7Ozs7Ozs7OztBQzlFQSxJQUFNLE9BQU8sR0FBWSxVQUFDLFNBQXNCLEVBQUUsTUFBaUI7SUFDL0QseUNBQXlDO0lBQ3pDLElBQUksT0FBTyxNQUFNLEtBQUssV0FBVztRQUFFLE9BQU87SUFDMUMsc0ZBQXNGO0lBQ3RGLGlEQUFpRDtJQUNqRCxrQ0FBa0M7SUFDbEMsSUFBTSxFQUFFLEdBQUcsSUFBSSxTQUFTLENBQUMsU0FBUyxFQUFFLE1BQU0sQ0FBQyxDQUFDO0lBQzVDLGlDQUFpQztJQUNqQyxNQUFNO0FBQ1YsQ0FBQyxDQUFDO0FBR0Y7SUFFSSxtQkFB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Q0QsSUFBSSxDQUFDLFdBQVcsQ0FBQyxHQUFHLENBQUMsQ0FBQztBQUUxQixDQUFDLENBQUM7QUF5QkYsSUFBSyxTQUtKO0FBTEQsV0FBSyxTQUFTO0lBQ1YsdUNBQUc7SUFDSCx5Q0FBSTtJQUNKLGlEQUFRO0lBQ1IsdUNBQUc7QUFDUCxDQUFDLEVBTEksU0FBUyxLQUFULFNBQVMsUUFLYjtBQUVELElBQUssU0FHSjtBQUhELFdBQUssU0FBUztJQUNWLGlEQUFRO0lBQ1IseURBQVk7QUFDaEIsQ0FBQyxFQUhJLFNBQVMsS0FBVCxTQUFTLFFBR2I7QUFFRCxrQkFBZSxPQUFPLENBQUM7Ozs7Ozs7Ozs7OztBQ3ZIdkIsY0FBYyxtQkFBTyxDQUFDLDZCQUFROztBQUU5QiIsImZpbGUiOiJwa2NoYXJ0LmpzIiwic291cmNlc0NvbnRlbnQiOlsiIFx0Ly8gVGhlIG1vZHVsZSBjYWNoZVxuIFx0dmFyIGluc3RhbGxlZE1vZHVsZXMgPSB7fTtcblxuIFx0Ly8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbiBcdGZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblxuIFx0XHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcbiBcdFx0aWYoaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0pIHtcbiBcdFx0XHRyZXR1cm4gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0uZXhwb3J0cztcbiBcdFx0fVxuIFx0XHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuIFx0XHR2YXIgbW9kdWxlID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0gPSB7XG4gXHRcdFx0aTogbW9kdWxlSWQsXG4gXHRcdFx0bDogZmFsc2UsXG4gXHRcdFx0ZXhwb3J0czoge31cbiBcdFx0fTtcblxuIFx0XHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cbiBcdFx0bW9kdWxlc1ttb2R1bGVJZF0uY2FsbChtb2R1bGUuZXhwb3J0cywgbW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cbiBcdFx0Ly8gRmxhZyB0aGUgbW9kdWxlIGFzIGxvYWRlZFxuIFx0XHRtb2R1bGUubCA9IHRydWU7XG5cbiBcdFx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcbiBcdFx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xuIFx0fVxuXG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlcyBvYmplY3QgKF9fd2VicGFja19tb2R1bGVzX18pXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm0gPSBtb2R1bGVzO1xuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZSBjYWNoZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5jID0gaW5zdGFsbGVkTW9kdWxlcztcblxuIFx0Ly8gZGVmaW5lIGdldHRlciBmdW5jdGlvbiBmb3IgaGFybW9ueSBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSBmdW5jdGlvbihleHBvcnRzLCBuYW1lLCBnZXR0ZXIpIHtcbiBcdFx0aWYoIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBuYW1lKSkge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBuYW1lLCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZ2V0dGVyIH0pO1xuIFx0XHR9XG4gXHR9O1xuXG4gXHQvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSBmdW5jdGlvbihleHBvcnRzKSB7XG4gXHRcdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuIFx0XHR9XG4gXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG4gXHR9O1xuXG4gXHQvLyBjcmVhdGUgYSBmYWtlIG5hbWVzcGFjZSBvYmplY3RcbiBcdC8vIG1vZGUgJiAxOiB2YWx1ZSBpcyBhIG1vZHVsZSBpZCwgcmVxdWlyZSBpdFxuIFx0Ly8gbW9kZSAmIDI6IG1lcmdlIGFsbCBwcm9wZXJ0aWVzIG9mIHZhbHVlIGludG8gdGhlIG5zXG4gXHQvLyBtb2RlICYgNDogcmV0dXJuIHZhbHVlIHdoZW4gYWxyZWFkeSBucyBvYmplY3RcbiBcdC8vIG1vZGUgJiA4fDE6IGJlaGF2ZSBsaWtlIHJlcXVpcmVcbiBcdF9fd2VicGFja19yZXF1aXJlX18udCA9IGZ1bmN0aW9uKHZhbHVlLCBtb2RlKSB7XG4gXHRcdGlmKG1vZGUgJiAxKSB2YWx1ZSA9IF9fd2VicGFja19yZXF1aXJlX18odmFsdWUpO1xuIFx0XHRpZihtb2RlICYgOCkgcmV0dXJuIHZhbHVlO1xuIFx0XHRpZigobW9kZSAmIDQpICYmIHR5cGVvZiB2YWx1ZSA9PT0gJ29iamVjdCcgJiYgdmFsdWUgJiYgdmFsdWUuX19lc01vZHVsZSkgcmV0dXJuIHZhbHVlO1xuIFx0XHR2YXIgbnMgPSBPYmplY3QuY3JlYXRlKG51bGwpO1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLnIobnMpO1xuIFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkobnMsICdkZWZhdWx0JywgeyBlbnVtZXJhYmxlOiB0cnVlLCB2YWx1ZTogdmFsdWUgfSk7XG4gXHRcdGlmKG1vZGUgJiAyICYmIHR5cGVvZiB2YWx1ZSAhPSAnc3RyaW5nJykgZm9yKHZhciBrZXkgaW4gdmFsdWUpIF9fd2VicGFja19yZXF1aXJlX18uZChucywga2V5LCBmdW5jdGlvbihrZXkpIHsgcmV0dXJuIHZhbHVlW2tleV07IH0uYmluZChudWxsLCBrZXkpKTtcbiBcdFx0cmV0dXJuIG5zO1xuIFx0fTtcblxuIFx0Ly8gZ2V0RGVmYXVsdEV4cG9ydCBmdW5jdGlvbiBmb3IgY29tcGF0aWJpbGl0eSB3aXRoIG5vbi1oYXJtb255IG1vZHVsZXNcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubiA9IGZ1bmN0aW9uKG1vZHVsZSkge1xuIFx0XHR2YXIgZ2V0dGVyID0gbW9kdWxlICYmIG1vZHVsZS5fX2VzTW9kdWxlID9cbiBcdFx0XHRmdW5jdGlvbiBnZXREZWZhdWx0KCkgeyByZXR1cm4gbW9kdWxlWydkZWZhdWx0J107IH0gOlxuIFx0XHRcdGZ1bmN0aW9uIGdldE1vZHVsZUV4cG9ydHMoKSB7IHJldHVybiBtb2R1bGU7IH07XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18uZChnZXR0ZXIsICdhJywgZ2V0dGVyKTtcbiBcdFx0cmV0dXJuIGdldHRlcjtcbiBcdH07XG5cbiBcdC8vIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbFxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5vID0gZnVuY3Rpb24ob2JqZWN0LCBwcm9wZXJ0eSkgeyByZXR1cm4gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iamVjdCwgcHJvcGVydHkpOyB9O1xuXG4gXHQvLyBfX3dlYnBhY2tfcHVibGljX3BhdGhfX1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5wID0gXCJcIjtcblxuXG4gXHQvLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbiBcdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fKF9fd2VicGFja19yZXF1aXJlX18ucyA9IFwiLi9zcmMvcGtjaGFydC5qc1wiKTtcbiIsIlxyXG5cclxuZXhwb3J0IHR5cGUgUEtDaGFydCA9IChlbGVtOiBIVE1MRWxlbWVudCwgcGFyYW1zOiBJUEtQYXJhbXMpID0+IFByb21pc2U8YW55PiB8IHZvaWQ7XHJcblxyXG5jb25zdCBwa2NoYXJ0OiBQS0NoYXJ0ID0gKGNvbnRhaW5lcjogSFRNTEVsZW1lbnQsIHBhcmFtczogSVBLUGFyYW1zKTogUHJvbWlzZTxhbnk+IHwgdm9pZCA9PiB7XHJcbiAgICAvLyBQcmV2ZW50IGxpYnJhcnkgdG8gYmUgcnVuIGluIE5vZGUgZW52OlxyXG4gICAgaWYgKHR5cGVvZiB3aW5kb3cgPT09ICd1bmRlZmluZWQnKSByZXR1cm47XHJcbiAgICAvLyBubyByZWFsIHdvcmxkIHVzZSBvZiB0aGUgYmVsb3cgcHJvbWlzZSBmb3Igbm93Li4gKGFzIGl0IGp1c3QgYWRkcyBhIHNpbXBsZSBlbGVtZW50KVxyXG4gICAgLy8gcmV0dXJuIG5ldyBQcm9taXNlPGFueT4oKHJlc29sdmUsIHJlamVjdCkgPT4ge1xyXG4gICAgLy9sZXQgcHJvbWlzZSA9IHtyZXNvbHZlLCByZWplY3R9O1xyXG4gICAgY29uc3QgY3MgPSBuZXcgQ29yZUNsYXNzKGNvbnRhaW5lciwgcGFyYW1zKTtcclxuICAgIC8vIEluaXRpYWxpemUoY29udGFpbmVyLCBwYXJhbXMpO1xyXG4gICAgLy8gfSk7XHJcbn07XHJcblxyXG5cclxuY2xhc3MgQ29yZUNsYXNzIHtcclxuXHJcbiAgICBjb25zdHJ1Y3Rvcihjb250YWluZXI6IEhUTUxFbGVtZW50LCBwYXJhbXM6IElQS1BhcmFtcykge1xyXG4gICAgICAgIHRoaXMuaW5pdGlhbGl6ZShjb250YWluZXIsIHBhcmFtcyk7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBpbml0aWFsaXplKGNvbnRhaW5lcjogSFRNTEVsZW1lbnQsIHBhcmFtczogSVBLUGFyYW1zKTogdm9pZCB7XHJcbiAgICAgICAgbGV0IGNoYXJ0RWxlbTogc3RyaW5nID0gJzxmaWd1cmU+JyArXHJcbiAgICAgICAgICAgICc8ZmlnY2FwdGlvbj4nICsgcGFyYW1zLmNvbmZpZy5jYXB0aW9uICsgJzwvZmlnY2FwdGlvbj4nICtcclxuICAgICAgICAgICAgJzxzdmcgY2xhc3M9XCJway1jaGFydFwiIHdpZHRoPVwiNDIwXCIgaGVpZ2h0PVwiMTUwXCIgYXJpYS1sYWJlbGxlZGJ5PVwidGl0bGUgZGVzY1wiIHJvbGU9XCJpbWdcIj4nICtcclxuICAgICAgICAgICAgJzx0aXRsZSBpZD1cInRpdGxlXCI+JyArIHBhcmFtcy5jb25maWcudGl0bGUgKyAnPC90aXRsZT4nO1xyXG4gICAgICAgIGxldCByZWN0WTogbnVtYmVyID0gMjA7XHJcbiAgICAgICAgbGV0IHR4dFk6IG51bWJlciA9IHJlY3RZICsgOTtcclxuICAgICAgICBwYXJhbXMuZGF0YS5mb3JFYWNoKChlbGVtZW50KSA9PiB7XHJcbiAgICAgICAgICAgIGNvbnN0IGJhcjogc3RyaW5nID0gJzxnIGNsYXNzPVwiYmFyXCI+JyArXHJcbiAgICAgICAgICAgICAgICAnPHJlY3Qgd2lkdGg9XCInICsgZWxlbWVudC5YVmFsdWUudG9TdHJpbmcoKSArICdcIiBoZWlnaHQ9XCIxOVwiIHk9XCInICsgcmVjdFkudG9TdHJpbmcoKSArICdcIj48L3JlY3Q+JyArXHJcbiAgICAgICAgICAgICAgICAnPHRleHQgeD1cIicgKyAoZWxlbWVudC5YVmFsdWUgKyA1KS50b1N0cmluZygpICsgJ1wiIHk9XCInICsgdHh0WS50b1N0cmluZygpICsgJ1wiIGR5PVwiLjM1ZW1cIj4nICsgZWxlbWVudC5MYWJlbCArICc8L3RleHQ+JyArXHJcbiAgICAgICAgICAgICAgICAnPC9nPic7XHJcbiAgICAgICAgICAgIHR4dFkgKz0gMjA7XHJcbiAgICAgICAgICAgIHJlY3RZICs9IDIwO1xyXG4gICAgICAgICAgICBjaGFydEVsZW0gPSBjaGFydEVsZW0gKyBiYXI7XHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgY2hhcnRFbGVtID0gY2hhcnRFbGVtICsgJzwvc3ZnPicgK1xyXG4gICAgICAgICAgICAnPC9maWd1cmU+JztcclxuICAgICAgICBjb25zdCBjaGFydE5vZGU6IE5vZGUgfCBudWxsID0gdGhpcy5jb252ZXJ0VG9Ob2RlcyhjaGFydEVsZW0pO1xyXG4gICAgICAgIGNvbnRhaW5lci5pbm5lckhUTUwgPSBjaGFydEVsZW07XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBjb252ZXJ0VG9Ob2Rlcyh4bWxTdHJpbmc6IHN0cmluZyk6IE5vZGUge1xyXG4gICAgICAgIGNvbnN0IG5vZGVzID0gbmV3IERPTVBhcnNlcigpO1xyXG4gICAgICAgIGNvbnN0IGRvYyA9IG5vZGVzLnBhcnNlRnJvbVN0cmluZyh4bWxTdHJpbmcsIFwidGV4dC94bWxcIik7XHJcbiAgICAgICAgcmV0dXJuIGRvYy5maXJzdENoaWxkID8gZG9jLmZpcnN0Q2hpbGQgOiBuZXcgTm9kZSgpO1xyXG4gICAgfVxyXG5cclxufVxyXG5cclxuXHJcblxyXG5jb25zdCBJbml0aWFsaXplID0gKGVsZW06IEhUTUxFbGVtZW50LCBwYXJhbXM6IElQS1BhcmFtcyk6IHZvaWQgPT4ge1xyXG4gICAgLy9zaW5jZSB0aGUgbGlicmFyeSBpcyBtZWFudCB0byBiZSB1c2VkIGRpcmVjdGx5IGluIGpzLCBpdCBpcyBiZXR0ZXIgdG8gY2hlY2sgdGhlIHR5cGVzIGV4cGxpY2l0bHkgYXQgcnVudGltZVxyXG4gICAgaWYgKCEoZWxlbSBpbnN0YW5jZW9mIEhUTUxFbGVtZW50KSkge1xyXG4gICAgICAgIGNvbnNvbGUubG9nKCdJbml0aWFsaXplOm5vdCBhIHZhbGlkIEhUTUxFbGVtZW50Jyk7XHJcbiAgICAgICAgcmV0dXJuO1xyXG4gICAgfVxyXG4gICAgLy9hZGQgYSBzaW1wbGUgc3ZnIGVsZW1lbnRcclxuICAgIGNvbnN0IHN2ZzogSFRNTEVsZW1lbnQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdzdmcnKTtcclxuICAgIHN2Zy5zZXRBdHRyaWJ1dGUoJ3dpZHRoJywgKDQyMCkudG9TdHJpbmcoKSk7XHJcbiAgICBzdmcuc2V0QXR0cmlidXRlKCdoZWlnaHQnLCAoMTUwKS50b1N0cmluZygpKTtcclxuICAgIHN2Zy5zZXRBdHRyaWJ1dGUoJ3JvbGUnLCAnaW1nJyk7XHJcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IE9iamVjdC5rZXlzKHBhcmFtcy5kYXRhKS5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgIGNvbnN0IGc6IEhUTUxFbGVtZW50ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZycpO1xyXG4gICAgICAgIGNvbnN0IHJlY3Q6IEhUTUxFbGVtZW50ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgncmVjdCcpO1xyXG4gICAgICAgIHJlY3Quc2V0QXR0cmlidXRlKCd3aWR0aCcsICgxMCAqIHBhcmFtcy5kYXRhW2ldLlhWYWx1ZSkudG9TdHJpbmcoKSk7XHJcbiAgICAgICAgcmVjdC5zZXRBdHRyaWJ1dGUoJ2hlaWdodCcsICgyMCkudG9TdHJpbmcoKSk7XHJcbiAgICAgICAgcmVjdC5zZXRBdHRyaWJ1dGUoJ3knLCAoaSAqIDIgKiAxMCkudG9TdHJpbmcoKSk7XHJcbiAgICAgICAgZy5hcHBlbmRDaGlsZChyZWN0KTtcclxuICAgICAgICBjb25zdCB0eHQ6IEhUTUxFbGVtZW50ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgndGV4dCcpO1xyXG4gICAgICAgIHR4dC5zZXRBdHRyaWJ1dGUoJ3gnLCAoKDEwICogcGFyYW1zLmRhdGFbaV0uWFZhbHVlKSArIDEpLnRvU3RyaW5nKCkpO1xyXG4gICAgICAgIHR4dC5zZXRBdHRyaWJ1dGUoJ3knLCAoKGkgKiAyICogMTApICsgOCkudG9TdHJpbmcoKSk7XHJcbiAgICAgICAgdHh0LnN0eWxlLmJvcmRlciA9ICcxcHggc29saWQnO1xyXG4gICAgICAgIHR4dC50ZXh0Q29udGVudCA9IHBhcmFtcy5kYXRhW2ldLkxhYmVsO1xyXG4gICAgICAgIGcuYXBwZW5kQ2hpbGQodHh0KTtcclxuICAgICAgICBzdmcuYXBwZW5kQ2hpbGQoZyk7XHJcbiAgICB9XHJcbiAgICBlbGVtLmFwcGVuZENoaWxkKHN2Zyk7XHJcblxyXG59O1xyXG5cclxuXHJcbmludGVyZmFjZSBJUEtQYXJhbXMge1xyXG4gICAgY29uZmlnOiBJQ29uZmlnO1xyXG4gICAgZGF0YTogSUF4aXNWYWx1ZVtdO1xyXG59XHJcblxyXG5pbnRlcmZhY2UgSUF4aXNWYWx1ZXMgZXh0ZW5kcyBBcnJheTxJQXhpc1ZhbHVlPiB7IH1cclxuXHJcbi8vIG1vcmUgb3B0aW9ucyB0byBiZSBhZGRlZC4uLlxyXG5pbnRlcmZhY2UgSUNvbmZpZyB7XHJcbiAgICBjaGFydFR5cGU6IENoYXJ0VHlwZTtcclxuICAgIGFuaW1hdGU/OiBib29sZWFuO1xyXG4gICAgY29sb3J0eXBlPzogQ29sb3JUeXBlO1xyXG4gICAgdGl0bGU/OiBzdHJpbmc7XHJcbiAgICBjYXB0aW9uPzogc3RyaW5nO1xyXG59XHJcblxyXG5pbnRlcmZhY2UgSUF4aXNWYWx1ZSB7XHJcbiAgICBYVmFsdWU6IG51bWJlcjtcclxuICAgIFlWYWx1ZTogbnVtYmVyO1xyXG4gICAgTGFiZWw6IHN0cmluZyB8IG51bGw7XHJcbn1cclxuXHJcbmVudW0gQ2hhcnRUeXBlIHtcclxuICAgIEJhcixcclxuICAgIExpbmUsXHJcbiAgICBDeWxpbmRlcixcclxuICAgIFBpZSxcclxufVxyXG5cclxuZW51bSBDb2xvclR5cGUge1xyXG4gICAgQ29udHJhc3QsXHJcbiAgICBQcm9mZXNzaW9uYWwsXHJcbn1cclxuXHJcbmV4cG9ydCBkZWZhdWx0IHBrY2hhcnQ7XHJcbiIsInZhciBwa2NoYXJ0ID0gcmVxdWlyZSgnLi9jb3JlJykuZGVmYXVsdDtcclxuICBcclxubW9kdWxlLmV4cG9ydHMgPSBwa2NoYXJ0O1xyXG4gICJdLCJzb3VyY2VSb290IjoiIn0=