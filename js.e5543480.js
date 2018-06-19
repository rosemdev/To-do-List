// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles

// eslint-disable-next-line no-global-assign
parcelRequire = (function (modules, cache, entry, globalName) {
  // Save the require from previous bundle to this closure if any
  var previousRequire = typeof parcelRequire === 'function' && parcelRequire;
  var nodeRequire = typeof require === 'function' && require;

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire = typeof parcelRequire === 'function' && parcelRequire;
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error('Cannot find module \'' + name + '\'');
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;

      var module = cache[name] = new newRequire.Module(name);

      modules[name][0].call(module.exports, localRequire, module, module.exports, this);
    }

    return cache[name].exports;

    function localRequire(x){
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x){
      return modules[name][1][x] || x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;

  for (var i = 0; i < entry.length; i++) {
    newRequire(entry[i]);
  }

  if (entry.length) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(entry[entry.length - 1]);

    // CommonJS
    if (typeof exports === "object" && typeof module !== "undefined") {
      module.exports = mainExports;

    // RequireJS
    } else if (typeof define === "function" && define.amd) {
     define(function () {
       return mainExports;
     });

    // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }

  // Override the current require with this new one
  return newRequire;
})({12:[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Storage = function () {
    function Storage(key) {
        _classCallCheck(this, Storage);

        this.key = key;

        if (!localStorage.getItem(key)) {
            // initialize todolist if it does not exist
            localStorage.setItem(key, JSON.stringify([]));
        }
    }

    _createClass(Storage, [{
        key: "add",
        value: function add(item) {
            var list = this.getAll();
            list.push(item);
            localStorage.setItem(this.key, JSON.stringify(list));
        }
    }, {
        key: "get",
        value: function get(index) {
            return this.getAll()[index];
        }
    }, {
        key: "update",
        value: function update(index, value) {
            var list = this.getAll();
            list[index] = Object.assign(list[index], value);
            localStorage.setItem(this.key, JSON.stringify(list));
        }
    }, {
        key: "updateProperty",
        value: function updateProperty(index, propertyName, value) {
            var list = this.getAll();
            list[index][propertyName] = value;
            localStorage.setItem(this.key, JSON.stringify(list));
        }
    }, {
        key: "getAll",
        value: function getAll() {
            return JSON.parse(localStorage.getItem(this.key));
        }
    }, {
        key: "remove",
        value: function remove(index) {
            var list = this.getAll();
            list.splice(index, 1);
            localStorage.setItem(this.key, JSON.stringify(list));
        }
    }, {
        key: "removeAll",
        value: function removeAll() {
            localStorage.removeItem(this.key);
        }
    }]);

    return Storage;
}();

exports.default = Storage;
},{}],10:[function(require,module,exports) {
module.exports="/check-mark.52004e5c.svg";
},{}],11:[function(require,module,exports) {
module.exports="/cross.0cb77e67.svg";
},{}],8:[function(require,module,exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.Todo = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _Storage = require('./Storage');

var _Storage2 = _interopRequireDefault(_Storage);

var _checkMark = require('../img/check-mark.svg');

var _checkMark2 = _interopRequireDefault(_checkMark);

var _cross = require('../img/cross.svg');

var _cross2 = _interopRequireDefault(_cross);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function getElementIndex(element) {
    var index = 0,
        iterator = element;

    while (iterator.previousElementSibling) {
        iterator = iterator.previousElementSibling;
        ++index;
    }

    return index;
}

var Todo = exports.Todo = function () {
    function Todo() {
        var _this = this;

        _classCallCheck(this, Todo);

        this.todoList = document.querySelector('.todo-container');
        this.letStartButton = this.todoList.querySelector('.description > .btn');
        this.TodoInput = this.todoList.querySelector('.todo-input > input');
        this.addTodoButton = this.todoList.querySelector('.todo-input > .btn');
        this.todoContent = this.todoList.querySelector('.to-dos');
        this.doneState = false;

        this.todoList = document.createElement('ul');
        this.todoContent.appendChild(this.todoList);

        this.totalTodos = document.createElement('p');
        this.todoList.parentElement.appendChild(this.totalTodos);

        this.letStartButton.addEventListener('click', function () {
            return _this.TodoInput.focus();
        });
        this.addTodoButton.addEventListener('click', function () {
            _this._createTodoFromInput(_this.TodoInput);
        });
        this.TodoInput.addEventListener('keydown', function () {
            if (event.keyCode === 13) {
                // esc key entered
                _this._createTodoFromInput(event.target);
            }
        });

        this.storage = new _Storage2.default('todolist');
        this.showTodoList();

        this.todoList.addEventListener('click', function () {
            var target = event.target,
                doneIcon = target.closest('img.todo-done'),
                removeIcon = target.closest('img.todo-remove'),
                editIcon = target.closest('.todo-edit'),
                li = target.closest('.todo-item');

            if (doneIcon) {
                li.querySelector('.todo').classList.toggle('done');

                _this.doneState = li.querySelector('.todo').classList.contains('done');
                _this.storage.update(li.parentElement.children.length - 1 - getElementIndex(li), { doneState: _this.doneState });
            } else if (removeIcon) {
                _this.storage.remove(li.parentElement.children.length - 1 - getElementIndex(li));
                li.remove();
                _this.todoCount();
            } else if (editIcon) {
                _this.edit(li);
                _this.submit(li.querySelector('.editor'), li);
            }
        });
    }

    _createClass(Todo, [{
        key: '_createTodoFromInput',
        value: function _createTodoFromInput(input) {
            var todo = { text: input.value, doneState: this.doneState };
            input.value = ''; // clear input
            this.createTodo(todo);
            this.storage.add(todo); // save to storage
        }
    }, {
        key: 'createTodo',
        value: function createTodo(todo) {
            var todoItem = '<li class="todo-item">\n    <p class="todo' + (todo.doneState ? ' done' : '') + '">' + todo.text + '</p>\n    <span class="control-block">\n        <small class="todo-edit">edit</small>\n        <img class="todo-done" src="' + _checkMark2.default + '">\n        <img class="todo-remove" src="' + _cross2.default + '">\n    </span>\n</li>';

            this.todoList.insertAdjacentHTML('afterBegin', todoItem);
            this.todoCount();
        }
    }, {
        key: 'todoCount',
        value: function todoCount() {
            this.totalTodos.innerHTML = 'Total: <span>' + this.todoList.children.length + '</span>';
        }
    }, {
        key: 'showTodoList',
        value: function showTodoList() {
            var _this2 = this;

            this.storage.getAll().forEach(function (todo) {
                _this2.createTodo(todo);
            });
        }
    }, {
        key: 'edit',
        value: function edit(li) {
            li.querySelector('.control-block').style.pointerEvents = 'none';
            var editInput = document.createElement("input");
            editInput.classList.add('editor');
            var todoTextElement = li.querySelector('.todo');
            editInput.value = todoTextElement.textContent;
            todoTextElement.textContent = '';
            todoTextElement.prepend(editInput);
            li.querySelector('.todo').classList.remove('done');
            editInput.focus();
        }
    }, {
        key: 'submit',
        value: function submit(editInput, li) {
            var _this3 = this;

            var okButton = document.createElement('a');
            okButton.classList.add('btn');
            okButton.textContent = 'Ok';
            okButton.style.textDecoration = '';
            editInput.after(okButton);

            var newTodo = editInput;

            okButton.addEventListener('click', function () {

                if (newTodo.value.length > 0) {
                    li.querySelector('.todo').textContent = newTodo.value;
                    editInput.replaceWith(li.querySelector('.todo'));
                    _this3.storage.update(li.parentElement.children.length - 1 - getElementIndex(li), { text: newTodo.value });
                } else {
                    var message = document.createElement('span');
                    message.textContent = 'Please, input todo, or delete that after submit.';
                    newTodo.after(message);
                }

                li.querySelector('.control-block').style.pointerEvents = '';
                li.querySelector('.todo').classList.add('done');
            });
        }
    }]);

    return Todo;
}();
},{"./Storage":12,"../img/check-mark.svg":10,"../img/cross.svg":11}],6:[function(require,module,exports) {
"use strict";

var _Todo = require("./Todo.js");

document.addEventListener("DOMContentLoaded", function (event) {
    console.log("DOM fully loaded and parsed");

    var todo = new _Todo.Todo();
});
},{"./Todo.js":8}],14:[function(require,module,exports) {
var global = arguments[3];
var OVERLAY_ID = '__parcel__error__overlay__';

var OldModule = module.bundle.Module;

function Module(moduleName) {
  OldModule.call(this, moduleName);
  this.hot = {
    data: module.bundle.hotData,
    _acceptCallbacks: [],
    _disposeCallbacks: [],
    accept: function (fn) {
      this._acceptCallbacks.push(fn || function () {});
    },
    dispose: function (fn) {
      this._disposeCallbacks.push(fn);
    }
  };

  module.bundle.hotData = null;
}

module.bundle.Module = Module;

var parent = module.bundle.parent;
if ((!parent || !parent.isParcelRequire) && typeof WebSocket !== 'undefined') {
  var hostname = '' || location.hostname;
  var protocol = location.protocol === 'https:' ? 'wss' : 'ws';
  var ws = new WebSocket(protocol + '://' + hostname + ':' + '37983' + '/');
  ws.onmessage = function (event) {
    var data = JSON.parse(event.data);

    if (data.type === 'update') {
      data.assets.forEach(function (asset) {
        hmrApply(global.parcelRequire, asset);
      });

      data.assets.forEach(function (asset) {
        if (!asset.isNew) {
          hmrAccept(global.parcelRequire, asset.id);
        }
      });
      // Clear the console after HMR
      console.clear();
    }

    if (data.type === 'reload') {
      ws.close();
      ws.onclose = function () {
        location.reload();
      };
    }

    if (data.type === 'error-resolved') {
      console.log('[parcel] ✨ Error resolved');

      removeErrorOverlay();
    }

    if (data.type === 'error') {
      console.error('[parcel] 🚨  ' + data.error.message + '\n' + data.error.stack);

      removeErrorOverlay();

      var overlay = createErrorOverlay(data);
      document.body.appendChild(overlay);
    }
  };
}

function removeErrorOverlay() {
  var overlay = document.getElementById(OVERLAY_ID);
  if (overlay) {
    overlay.remove();
  }
}

function createErrorOverlay(data) {
  var overlay = document.createElement('div');
  overlay.id = OVERLAY_ID;

  // html encode message and stack trace
  var message = document.createElement('div');
  var stackTrace = document.createElement('pre');
  message.innerText = data.error.message;
  stackTrace.innerText = data.error.stack;

  overlay.innerHTML = '<div style="background: black; font-size: 16px; color: white; position: fixed; height: 100%; width: 100%; top: 0px; left: 0px; padding: 30px; opacity: 0.85; font-family: Menlo, Consolas, monospace; z-index: 9999;">' + '<span style="background: red; padding: 2px 4px; border-radius: 2px;">ERROR</span>' + '<span style="top: 2px; margin-left: 5px; position: relative;">🚨</span>' + '<div style="font-size: 18px; font-weight: bold; margin-top: 20px;">' + message.innerHTML + '</div>' + '<pre>' + stackTrace.innerHTML + '</pre>' + '</div>';

  return overlay;
}

function getParents(bundle, id) {
  var modules = bundle.modules;
  if (!modules) {
    return [];
  }

  var parents = [];
  var k, d, dep;

  for (k in modules) {
    for (d in modules[k][1]) {
      dep = modules[k][1][d];
      if (dep === id || Array.isArray(dep) && dep[dep.length - 1] === id) {
        parents.push(+k);
      }
    }
  }

  if (bundle.parent) {
    parents = parents.concat(getParents(bundle.parent, id));
  }

  return parents;
}

function hmrApply(bundle, asset) {
  var modules = bundle.modules;
  if (!modules) {
    return;
  }

  if (modules[asset.id] || !bundle.parent) {
    var fn = new Function('require', 'module', 'exports', asset.generated.js);
    asset.isNew = !modules[asset.id];
    modules[asset.id] = [fn, asset.deps];
  } else if (bundle.parent) {
    hmrApply(bundle.parent, asset);
  }
}

function hmrAccept(bundle, id) {
  var modules = bundle.modules;
  if (!modules) {
    return;
  }

  if (!modules[id] && bundle.parent) {
    return hmrAccept(bundle.parent, id);
  }

  var cached = bundle.cache[id];
  bundle.hotData = {};
  if (cached) {
    cached.hot.data = bundle.hotData;
  }

  if (cached && cached.hot && cached.hot._disposeCallbacks.length) {
    cached.hot._disposeCallbacks.forEach(function (cb) {
      cb(bundle.hotData);
    });
  }

  delete bundle.cache[id];
  bundle(id);

  cached = bundle.cache[id];
  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    cached.hot._acceptCallbacks.forEach(function (cb) {
      cb();
    });
    return true;
  }

  return getParents(global.parcelRequire, id).some(function (id) {
    return hmrAccept(global.parcelRequire, id);
  });
}
},{}]},{},[14,6], null)
//# sourceMappingURL=/js.e5543480.map