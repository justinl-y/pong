/******/ (function(modules) { // webpackBootstrap
/******/ 	var parentHotUpdateCallback = this["webpackHotUpdate"];
/******/ 	this["webpackHotUpdate"] = function webpackHotUpdateCallback(chunkId, moreModules) { // eslint-disable-line no-unused-vars
/******/ 		hotAddUpdateChunk(chunkId, moreModules);
/******/ 		if(parentHotUpdateCallback) parentHotUpdateCallback(chunkId, moreModules);
/******/ 	}

/******/ 	function hotDownloadUpdateChunk(chunkId) { // eslint-disable-line no-unused-vars
/******/ 		var head = document.getElementsByTagName("head")[0];
/******/ 		var script = document.createElement("script");
/******/ 		script.type = "text/javascript";
/******/ 		script.charset = "utf-8";
/******/ 		script.src = __webpack_require__.p + "" + chunkId + "." + hotCurrentHash + ".hot-update.js";
/******/ 		head.appendChild(script);
/******/ 	}

/******/ 	function hotDownloadManifest(callback) { // eslint-disable-line no-unused-vars
/******/ 		if(typeof XMLHttpRequest === "undefined")
/******/ 			return callback(new Error("No browser support"));
/******/ 		try {
/******/ 			var request = new XMLHttpRequest();
/******/ 			var requestPath = __webpack_require__.p + "" + hotCurrentHash + ".hot-update.json";
/******/ 			request.open("GET", requestPath, true);
/******/ 			request.timeout = 10000;
/******/ 			request.send(null);
/******/ 		} catch(err) {
/******/ 			return callback(err);
/******/ 		}
/******/ 		request.onreadystatechange = function() {
/******/ 			if(request.readyState !== 4) return;
/******/ 			if(request.status === 0) {
/******/ 				// timeout
/******/ 				callback(new Error("Manifest request to " + requestPath + " timed out."));
/******/ 			} else if(request.status === 404) {
/******/ 				// no update available
/******/ 				callback();
/******/ 			} else if(request.status !== 200 && request.status !== 304) {
/******/ 				// other failure
/******/ 				callback(new Error("Manifest request to " + requestPath + " failed."));
/******/ 			} else {
/******/ 				// success
/******/ 				try {
/******/ 					var update = JSON.parse(request.responseText);
/******/ 				} catch(e) {
/******/ 					callback(e);
/******/ 					return;
/******/ 				}
/******/ 				callback(null, update);
/******/ 			}
/******/ 		};
/******/ 	}


/******/ 	// Copied from https://github.com/facebook/react/blob/bef45b0/src/shared/utils/canDefineProperty.js
/******/ 	var canDefineProperty = false;
/******/ 	try {
/******/ 		Object.defineProperty({}, "x", {
/******/ 			get: function() {}
/******/ 		});
/******/ 		canDefineProperty = true;
/******/ 	} catch(x) {
/******/ 		// IE will fail on defineProperty
/******/ 	}

/******/ 	var hotApplyOnUpdate = true;
/******/ 	var hotCurrentHash = "2c5f7a7408a32c0a27ab"; // eslint-disable-line no-unused-vars
/******/ 	var hotCurrentModuleData = {};
/******/ 	var hotCurrentParents = []; // eslint-disable-line no-unused-vars

/******/ 	function hotCreateRequire(moduleId) { // eslint-disable-line no-unused-vars
/******/ 		var me = installedModules[moduleId];
/******/ 		if(!me) return __webpack_require__;
/******/ 		var fn = function(request) {
/******/ 			if(me.hot.active) {
/******/ 				if(installedModules[request]) {
/******/ 					if(installedModules[request].parents.indexOf(moduleId) < 0)
/******/ 						installedModules[request].parents.push(moduleId);
/******/ 					if(me.children.indexOf(request) < 0)
/******/ 						me.children.push(request);
/******/ 				} else hotCurrentParents = [moduleId];
/******/ 			} else {
/******/ 				console.warn("[HMR] unexpected require(" + request + ") from disposed module " + moduleId);
/******/ 				hotCurrentParents = [];
/******/ 			}
/******/ 			return __webpack_require__(request);
/******/ 		};
/******/ 		for(var name in __webpack_require__) {
/******/ 			if(Object.prototype.hasOwnProperty.call(__webpack_require__, name)) {
/******/ 				if(canDefineProperty) {
/******/ 					Object.defineProperty(fn, name, (function(name) {
/******/ 						return {
/******/ 							configurable: true,
/******/ 							enumerable: true,
/******/ 							get: function() {
/******/ 								return __webpack_require__[name];
/******/ 							},
/******/ 							set: function(value) {
/******/ 								__webpack_require__[name] = value;
/******/ 							}
/******/ 						};
/******/ 					}(name)));
/******/ 				} else {
/******/ 					fn[name] = __webpack_require__[name];
/******/ 				}
/******/ 			}
/******/ 		}

/******/ 		function ensure(chunkId, callback) {
/******/ 			if(hotStatus === "ready")
/******/ 				hotSetStatus("prepare");
/******/ 			hotChunksLoading++;
/******/ 			__webpack_require__.e(chunkId, function() {
/******/ 				try {
/******/ 					callback.call(null, fn);
/******/ 				} finally {
/******/ 					finishChunkLoading();
/******/ 				}

/******/ 				function finishChunkLoading() {
/******/ 					hotChunksLoading--;
/******/ 					if(hotStatus === "prepare") {
/******/ 						if(!hotWaitingFilesMap[chunkId]) {
/******/ 							hotEnsureUpdateChunk(chunkId);
/******/ 						}
/******/ 						if(hotChunksLoading === 0 && hotWaitingFiles === 0) {
/******/ 							hotUpdateDownloaded();
/******/ 						}
/******/ 					}
/******/ 				}
/******/ 			});
/******/ 		}
/******/ 		if(canDefineProperty) {
/******/ 			Object.defineProperty(fn, "e", {
/******/ 				enumerable: true,
/******/ 				value: ensure
/******/ 			});
/******/ 		} else {
/******/ 			fn.e = ensure;
/******/ 		}
/******/ 		return fn;
/******/ 	}

/******/ 	function hotCreateModule(moduleId) { // eslint-disable-line no-unused-vars
/******/ 		var hot = {
/******/ 			// private stuff
/******/ 			_acceptedDependencies: {},
/******/ 			_declinedDependencies: {},
/******/ 			_selfAccepted: false,
/******/ 			_selfDeclined: false,
/******/ 			_disposeHandlers: [],

/******/ 			// Module API
/******/ 			active: true,
/******/ 			accept: function(dep, callback) {
/******/ 				if(typeof dep === "undefined")
/******/ 					hot._selfAccepted = true;
/******/ 				else if(typeof dep === "function")
/******/ 					hot._selfAccepted = dep;
/******/ 				else if(typeof dep === "object")
/******/ 					for(var i = 0; i < dep.length; i++)
/******/ 						hot._acceptedDependencies[dep[i]] = callback;
/******/ 				else
/******/ 					hot._acceptedDependencies[dep] = callback;
/******/ 			},
/******/ 			decline: function(dep) {
/******/ 				if(typeof dep === "undefined")
/******/ 					hot._selfDeclined = true;
/******/ 				else if(typeof dep === "number")
/******/ 					hot._declinedDependencies[dep] = true;
/******/ 				else
/******/ 					for(var i = 0; i < dep.length; i++)
/******/ 						hot._declinedDependencies[dep[i]] = true;
/******/ 			},
/******/ 			dispose: function(callback) {
/******/ 				hot._disposeHandlers.push(callback);
/******/ 			},
/******/ 			addDisposeHandler: function(callback) {
/******/ 				hot._disposeHandlers.push(callback);
/******/ 			},
/******/ 			removeDisposeHandler: function(callback) {
/******/ 				var idx = hot._disposeHandlers.indexOf(callback);
/******/ 				if(idx >= 0) hot._disposeHandlers.splice(idx, 1);
/******/ 			},

/******/ 			// Management API
/******/ 			check: hotCheck,
/******/ 			apply: hotApply,
/******/ 			status: function(l) {
/******/ 				if(!l) return hotStatus;
/******/ 				hotStatusHandlers.push(l);
/******/ 			},
/******/ 			addStatusHandler: function(l) {
/******/ 				hotStatusHandlers.push(l);
/******/ 			},
/******/ 			removeStatusHandler: function(l) {
/******/ 				var idx = hotStatusHandlers.indexOf(l);
/******/ 				if(idx >= 0) hotStatusHandlers.splice(idx, 1);
/******/ 			},

/******/ 			//inherit from previous dispose call
/******/ 			data: hotCurrentModuleData[moduleId]
/******/ 		};
/******/ 		return hot;
/******/ 	}

/******/ 	var hotStatusHandlers = [];
/******/ 	var hotStatus = "idle";

/******/ 	function hotSetStatus(newStatus) {
/******/ 		hotStatus = newStatus;
/******/ 		for(var i = 0; i < hotStatusHandlers.length; i++)
/******/ 			hotStatusHandlers[i].call(null, newStatus);
/******/ 	}

/******/ 	// while downloading
/******/ 	var hotWaitingFiles = 0;
/******/ 	var hotChunksLoading = 0;
/******/ 	var hotWaitingFilesMap = {};
/******/ 	var hotRequestedFilesMap = {};
/******/ 	var hotAvailibleFilesMap = {};
/******/ 	var hotCallback;

/******/ 	// The update info
/******/ 	var hotUpdate, hotUpdateNewHash;

/******/ 	function toModuleId(id) {
/******/ 		var isNumber = (+id) + "" === id;
/******/ 		return isNumber ? +id : id;
/******/ 	}

/******/ 	function hotCheck(apply, callback) {
/******/ 		if(hotStatus !== "idle") throw new Error("check() is only allowed in idle status");
/******/ 		if(typeof apply === "function") {
/******/ 			hotApplyOnUpdate = false;
/******/ 			callback = apply;
/******/ 		} else {
/******/ 			hotApplyOnUpdate = apply;
/******/ 			callback = callback || function(err) {
/******/ 				if(err) throw err;
/******/ 			};
/******/ 		}
/******/ 		hotSetStatus("check");
/******/ 		hotDownloadManifest(function(err, update) {
/******/ 			if(err) return callback(err);
/******/ 			if(!update) {
/******/ 				hotSetStatus("idle");
/******/ 				callback(null, null);
/******/ 				return;
/******/ 			}

/******/ 			hotRequestedFilesMap = {};
/******/ 			hotAvailibleFilesMap = {};
/******/ 			hotWaitingFilesMap = {};
/******/ 			for(var i = 0; i < update.c.length; i++)
/******/ 				hotAvailibleFilesMap[update.c[i]] = true;
/******/ 			hotUpdateNewHash = update.h;

/******/ 			hotSetStatus("prepare");
/******/ 			hotCallback = callback;
/******/ 			hotUpdate = {};
/******/ 			var chunkId = 0;
/******/ 			{ // eslint-disable-line no-lone-blocks
/******/ 				/*globals chunkId */
/******/ 				hotEnsureUpdateChunk(chunkId);
/******/ 			}
/******/ 			if(hotStatus === "prepare" && hotChunksLoading === 0 && hotWaitingFiles === 0) {
/******/ 				hotUpdateDownloaded();
/******/ 			}
/******/ 		});
/******/ 	}

/******/ 	function hotAddUpdateChunk(chunkId, moreModules) { // eslint-disable-line no-unused-vars
/******/ 		if(!hotAvailibleFilesMap[chunkId] || !hotRequestedFilesMap[chunkId])
/******/ 			return;
/******/ 		hotRequestedFilesMap[chunkId] = false;
/******/ 		for(var moduleId in moreModules) {
/******/ 			if(Object.prototype.hasOwnProperty.call(moreModules, moduleId)) {
/******/ 				hotUpdate[moduleId] = moreModules[moduleId];
/******/ 			}
/******/ 		}
/******/ 		if(--hotWaitingFiles === 0 && hotChunksLoading === 0) {
/******/ 			hotUpdateDownloaded();
/******/ 		}
/******/ 	}

/******/ 	function hotEnsureUpdateChunk(chunkId) {
/******/ 		if(!hotAvailibleFilesMap[chunkId]) {
/******/ 			hotWaitingFilesMap[chunkId] = true;
/******/ 		} else {
/******/ 			hotRequestedFilesMap[chunkId] = true;
/******/ 			hotWaitingFiles++;
/******/ 			hotDownloadUpdateChunk(chunkId);
/******/ 		}
/******/ 	}

/******/ 	function hotUpdateDownloaded() {
/******/ 		hotSetStatus("ready");
/******/ 		var callback = hotCallback;
/******/ 		hotCallback = null;
/******/ 		if(!callback) return;
/******/ 		if(hotApplyOnUpdate) {
/******/ 			hotApply(hotApplyOnUpdate, callback);
/******/ 		} else {
/******/ 			var outdatedModules = [];
/******/ 			for(var id in hotUpdate) {
/******/ 				if(Object.prototype.hasOwnProperty.call(hotUpdate, id)) {
/******/ 					outdatedModules.push(toModuleId(id));
/******/ 				}
/******/ 			}
/******/ 			callback(null, outdatedModules);
/******/ 		}
/******/ 	}

/******/ 	function hotApply(options, callback) {
/******/ 		if(hotStatus !== "ready") throw new Error("apply() is only allowed in ready status");
/******/ 		if(typeof options === "function") {
/******/ 			callback = options;
/******/ 			options = {};
/******/ 		} else if(options && typeof options === "object") {
/******/ 			callback = callback || function(err) {
/******/ 				if(err) throw err;
/******/ 			};
/******/ 		} else {
/******/ 			options = {};
/******/ 			callback = callback || function(err) {
/******/ 				if(err) throw err;
/******/ 			};
/******/ 		}

/******/ 		function getAffectedStuff(module) {
/******/ 			var outdatedModules = [module];
/******/ 			var outdatedDependencies = {};

/******/ 			var queue = outdatedModules.slice();
/******/ 			while(queue.length > 0) {
/******/ 				var moduleId = queue.pop();
/******/ 				var module = installedModules[moduleId];
/******/ 				if(!module || module.hot._selfAccepted)
/******/ 					continue;
/******/ 				if(module.hot._selfDeclined) {
/******/ 					return new Error("Aborted because of self decline: " + moduleId);
/******/ 				}
/******/ 				if(moduleId === 0) {
/******/ 					return;
/******/ 				}
/******/ 				for(var i = 0; i < module.parents.length; i++) {
/******/ 					var parentId = module.parents[i];
/******/ 					var parent = installedModules[parentId];
/******/ 					if(parent.hot._declinedDependencies[moduleId]) {
/******/ 						return new Error("Aborted because of declined dependency: " + moduleId + " in " + parentId);
/******/ 					}
/******/ 					if(outdatedModules.indexOf(parentId) >= 0) continue;
/******/ 					if(parent.hot._acceptedDependencies[moduleId]) {
/******/ 						if(!outdatedDependencies[parentId])
/******/ 							outdatedDependencies[parentId] = [];
/******/ 						addAllToSet(outdatedDependencies[parentId], [moduleId]);
/******/ 						continue;
/******/ 					}
/******/ 					delete outdatedDependencies[parentId];
/******/ 					outdatedModules.push(parentId);
/******/ 					queue.push(parentId);
/******/ 				}
/******/ 			}

/******/ 			return [outdatedModules, outdatedDependencies];
/******/ 		}

/******/ 		function addAllToSet(a, b) {
/******/ 			for(var i = 0; i < b.length; i++) {
/******/ 				var item = b[i];
/******/ 				if(a.indexOf(item) < 0)
/******/ 					a.push(item);
/******/ 			}
/******/ 		}

/******/ 		// at begin all updates modules are outdated
/******/ 		// the "outdated" status can propagate to parents if they don't accept the children
/******/ 		var outdatedDependencies = {};
/******/ 		var outdatedModules = [];
/******/ 		var appliedUpdate = {};
/******/ 		for(var id in hotUpdate) {
/******/ 			if(Object.prototype.hasOwnProperty.call(hotUpdate, id)) {
/******/ 				var moduleId = toModuleId(id);
/******/ 				var result = getAffectedStuff(moduleId);
/******/ 				if(!result) {
/******/ 					if(options.ignoreUnaccepted)
/******/ 						continue;
/******/ 					hotSetStatus("abort");
/******/ 					return callback(new Error("Aborted because " + moduleId + " is not accepted"));
/******/ 				}
/******/ 				if(result instanceof Error) {
/******/ 					hotSetStatus("abort");
/******/ 					return callback(result);
/******/ 				}
/******/ 				appliedUpdate[moduleId] = hotUpdate[moduleId];
/******/ 				addAllToSet(outdatedModules, result[0]);
/******/ 				for(var moduleId in result[1]) {
/******/ 					if(Object.prototype.hasOwnProperty.call(result[1], moduleId)) {
/******/ 						if(!outdatedDependencies[moduleId])
/******/ 							outdatedDependencies[moduleId] = [];
/******/ 						addAllToSet(outdatedDependencies[moduleId], result[1][moduleId]);
/******/ 					}
/******/ 				}
/******/ 			}
/******/ 		}

/******/ 		// Store self accepted outdated modules to require them later by the module system
/******/ 		var outdatedSelfAcceptedModules = [];
/******/ 		for(var i = 0; i < outdatedModules.length; i++) {
/******/ 			var moduleId = outdatedModules[i];
/******/ 			if(installedModules[moduleId] && installedModules[moduleId].hot._selfAccepted)
/******/ 				outdatedSelfAcceptedModules.push({
/******/ 					module: moduleId,
/******/ 					errorHandler: installedModules[moduleId].hot._selfAccepted
/******/ 				});
/******/ 		}

/******/ 		// Now in "dispose" phase
/******/ 		hotSetStatus("dispose");
/******/ 		var queue = outdatedModules.slice();
/******/ 		while(queue.length > 0) {
/******/ 			var moduleId = queue.pop();
/******/ 			var module = installedModules[moduleId];
/******/ 			if(!module) continue;

/******/ 			var data = {};

/******/ 			// Call dispose handlers
/******/ 			var disposeHandlers = module.hot._disposeHandlers;
/******/ 			for(var j = 0; j < disposeHandlers.length; j++) {
/******/ 				var cb = disposeHandlers[j];
/******/ 				cb(data);
/******/ 			}
/******/ 			hotCurrentModuleData[moduleId] = data;

/******/ 			// disable module (this disables requires from this module)
/******/ 			module.hot.active = false;

/******/ 			// remove module from cache
/******/ 			delete installedModules[moduleId];

/******/ 			// remove "parents" references from all children
/******/ 			for(var j = 0; j < module.children.length; j++) {
/******/ 				var child = installedModules[module.children[j]];
/******/ 				if(!child) continue;
/******/ 				var idx = child.parents.indexOf(moduleId);
/******/ 				if(idx >= 0) {
/******/ 					child.parents.splice(idx, 1);
/******/ 				}
/******/ 			}
/******/ 		}

/******/ 		// remove outdated dependency from module children
/******/ 		for(var moduleId in outdatedDependencies) {
/******/ 			if(Object.prototype.hasOwnProperty.call(outdatedDependencies, moduleId)) {
/******/ 				var module = installedModules[moduleId];
/******/ 				var moduleOutdatedDependencies = outdatedDependencies[moduleId];
/******/ 				for(var j = 0; j < moduleOutdatedDependencies.length; j++) {
/******/ 					var dependency = moduleOutdatedDependencies[j];
/******/ 					var idx = module.children.indexOf(dependency);
/******/ 					if(idx >= 0) module.children.splice(idx, 1);
/******/ 				}
/******/ 			}
/******/ 		}

/******/ 		// Not in "apply" phase
/******/ 		hotSetStatus("apply");

/******/ 		hotCurrentHash = hotUpdateNewHash;

/******/ 		// insert new code
/******/ 		for(var moduleId in appliedUpdate) {
/******/ 			if(Object.prototype.hasOwnProperty.call(appliedUpdate, moduleId)) {
/******/ 				modules[moduleId] = appliedUpdate[moduleId];
/******/ 			}
/******/ 		}

/******/ 		// call accept handlers
/******/ 		var error = null;
/******/ 		for(var moduleId in outdatedDependencies) {
/******/ 			if(Object.prototype.hasOwnProperty.call(outdatedDependencies, moduleId)) {
/******/ 				var module = installedModules[moduleId];
/******/ 				var moduleOutdatedDependencies = outdatedDependencies[moduleId];
/******/ 				var callbacks = [];
/******/ 				for(var i = 0; i < moduleOutdatedDependencies.length; i++) {
/******/ 					var dependency = moduleOutdatedDependencies[i];
/******/ 					var cb = module.hot._acceptedDependencies[dependency];
/******/ 					if(callbacks.indexOf(cb) >= 0) continue;
/******/ 					callbacks.push(cb);
/******/ 				}
/******/ 				for(var i = 0; i < callbacks.length; i++) {
/******/ 					var cb = callbacks[i];
/******/ 					try {
/******/ 						cb(outdatedDependencies);
/******/ 					} catch(err) {
/******/ 						if(!error)
/******/ 							error = err;
/******/ 					}
/******/ 				}
/******/ 			}
/******/ 		}

/******/ 		// Load self accepted modules
/******/ 		for(var i = 0; i < outdatedSelfAcceptedModules.length; i++) {
/******/ 			var item = outdatedSelfAcceptedModules[i];
/******/ 			var moduleId = item.module;
/******/ 			hotCurrentParents = [moduleId];
/******/ 			try {
/******/ 				__webpack_require__(moduleId);
/******/ 			} catch(err) {
/******/ 				if(typeof item.errorHandler === "function") {
/******/ 					try {
/******/ 						item.errorHandler(err);
/******/ 					} catch(err) {
/******/ 						if(!error)
/******/ 							error = err;
/******/ 					}
/******/ 				} else if(!error)
/******/ 					error = err;
/******/ 			}
/******/ 		}

/******/ 		// handle errors in accept handlers and self accepted module load
/******/ 		if(error) {
/******/ 			hotSetStatus("fail");
/******/ 			return callback(error);
/******/ 		}

/******/ 		hotSetStatus("idle");
/******/ 		callback(null, outdatedModules);
/******/ 	}

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
/******/ 			loaded: false,
/******/ 			hot: hotCreateModule(moduleId),
/******/ 			parents: hotCurrentParents,
/******/ 			children: []
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, hotCreateRequire(moduleId));

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

/******/ 	// __webpack_hash__
/******/ 	__webpack_require__.h = function() { return hotCurrentHash; };

/******/ 	// Load entry module and return exports
/******/ 	return hotCreateRequire(0)(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	__webpack_require__(1);

	var _settings = __webpack_require__(10);

	var _keys = __webpack_require__(11);

	var _Game = __webpack_require__(12);

	var _Game2 = _interopRequireDefault(_Game);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var gameID = _settings.gameSettings.gameID;
	var animationMS = _settings.gameSettings.animationMS;
	var canvas = document.getElementById(gameID);
	var context = canvas.getContext('2d');
	var boardHeight = canvas.height;
	var boardWidth = canvas.width;

	//let numberOfBalls = gameSettings.ballNumberInitial;
	var paddleColourIndex = _settings.gameSettings.paddleColourInitial;
	var paddleColour = _settings.gameSettings.paddleColours[paddleColourIndex];
	var paddleHeight = _settings.gameSettings.paddleHeight;

	// create game
	var game = new _Game2.default(gameID, canvas);
	game.createBoard(context, boardHeight, boardWidth);
	game.createScoreboard(context, boardWidth, -10, 'end', 0, 0);
	game.createScoreboard(context, boardWidth, 10, 'start', 0, 0);
	game.createPaddle(context, boardHeight, 5, paddleColour, _settings.gameSettings.paddleWidth, paddleHeight, _settings.gameSettings.paddleSpeed, _keys.player1Keys);
	game.createPaddle(context, boardHeight, boardWidth - (5 + _settings.gameSettings.paddleWidth), paddleColour, _settings.gameSettings.paddleWidth, paddleHeight, _settings.gameSettings.paddleSpeed, _keys.player2Keys);
	game.createBalls(context, boardHeight, boardWidth, _settings.gameSettings.ballNumberInitial);

	// call self invoking function to run game
	(function gameLoop() {
		game.render();
		setTimeout(window.requestAnimationFrame(gameLoop), animationMS);

		var playerScoreAverage = Math.max(game.scoreboards[0].score, game.scoreboards[1].score);

		// change balls and paddle size with score
		switch (playerScoreAverage) {
			case 0:
			case 1:
				while (game.balls.length < 1) {
					game.createBall(context, boardHeight, boardWidth);
				}
				break;
			case 2:
			case 3:
				while (game.balls.length < 2) {
					game.createBall(context, boardHeight, boardWidth);
				}
				break;
			case 4:
			case 5:
				while (game.balls.length < 3) {
					game.createBall(context, boardHeight, boardWidth);
				}
				break;
			case 6:
			case 7:
				while (game.balls.length < 4) {
					game.createBall(context, boardHeight, boardWidth);
				}
				break;
			case 8:
			case 9:
				while (game.balls.length < 5) {
					game.createBall(context, boardHeight, boardWidth);
				}
				break;
			default:
				if (game.scoreboards[0].score > 9) {
					game.scoreboards[0].game++;
					game.scoreboards[0].score = 0;
					game.scoreboards[1].score = 0;
				} else if (game.scoreboards[1].score > 9) {
					game.scoreboards[1].game++;
					game.scoreboards[0].score = 0;
					game.scoreboards[1].score = 0;
				}

				var playerGameAverage = game.scoreboards[0].game + game.scoreboards[1].game;

				game.balls = [];
				paddleColourIndex++;

				switch (playerGameAverage) {
					case 1:
						paddleColour = _settings.gameSettings.paddleColours[paddleColourIndex];
						paddleHeight = _settings.gameSettings.paddleHeight / 100 * 85;

						game.paddles = [];
						game.createPaddle(context, boardHeight, 5, paddleColour, _settings.gameSettings.paddleWidth, paddleHeight, _settings.gameSettings.paddleSpeed, _keys.player1Keys);
						game.createPaddle(context, boardHeight, boardWidth - (5 + _settings.gameSettings.paddleWidth), paddleColour, _settings.gameSettings.paddleWidth, paddleHeight, _settings.gameSettings.paddleSpeed, _keys.player2Keys);
						break;
					case 2:
						paddleColour = _settings.gameSettings.paddleColours[paddleColourIndex];
						paddleHeight = _settings.gameSettings.paddleHeight / 100 * 70;

						game.paddles = [];
						game.createPaddle(context, boardHeight, 5, paddleColour, _settings.gameSettings.paddleWidth, paddleHeight, _settings.gameSettings.paddleSpeed, _keys.player1Keys);
						game.createPaddle(context, boardHeight, boardWidth - (5 + _settings.gameSettings.paddleWidth), paddleColour, _settings.gameSettings.paddleWidth, paddleHeight, _settings.gameSettings.paddleSpeed, _keys.player2Keys);
						break;
					case 3:
						paddleColour = _settings.gameSettings.paddleColours[paddleColourIndex];
						paddleHeight = _settings.gameSettings.paddleHeight / 100 * 55;

						game.paddles = [];
						game.createPaddle(context, boardHeight, 5, paddleColour, _settings.gameSettings.paddleWidth, paddleHeight, _settings.gameSettings.paddleSpeed, _keys.player1Keys);
						game.createPaddle(context, boardHeight, boardWidth - (5 + _settings.gameSettings.paddleWidth), paddleColour, _settings.gameSettings.paddleWidth, paddleHeight, _settings.gameSettings.paddleSpeed, _keys.player2Keys);
						break;
					case 4:
						paddleColour = _settings.gameSettings.paddleColours[paddleColourIndex];
						paddleHeight = _settings.gameSettings.paddleHeight / 100 * 40;

						game.paddles = [];
						game.createPaddle(context, boardHeight, 5, paddleColour, _settings.gameSettings.paddleWidth, paddleHeight, _settings.gameSettings.paddleSpeed, _keys.player1Keys);
						game.createPaddle(context, boardHeight, boardWidth - (5 + _settings.gameSettings.paddleWidth), paddleColour, _settings.gameSettings.paddleWidth, paddleHeight, _settings.gameSettings.paddleSpeed, _keys.player2Keys);
						break;
					default:
						var calculateWinner = function calculateWinner() {
							if (game.scoreboards[0].game > game.scoreboards[1].game) {
								return 'Player one is the winner.';
							} else if (game.scoreboards[0].game < game.scoreboards[1].game) {
								return 'Player two is the winner.';
							} else if (game.scoreboards[0].score > game.scoreboards[1].score) {
								return 'Player one is the winner.';
							} else if (game.scoreboards[0].score < game.scoreboards[1].score) {
								return 'Player two is the winner.';
							} else {
								return 'We have a draw.';
							}
						};

						context.font = "20px Helvetica";
						context.textAlign = 'center';
						context.textBaseline = 'top';
						context.fillText(calculateWinner(), boardWidth / 2, boardHeight / 2);

						game.board = null;

					/*'Greetings Professor Falken.'
	    'A strange game.  The ony winning move is not to play.'
	    'How about a nice game of chess?'*/
				}
		}
	})();

/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag

	// load the styles
	var content = __webpack_require__(2);
	if(typeof content === 'string') content = [[module.id, content, '']];
	// add the styles to the DOM
	var update = __webpack_require__(9)(content, {});
	if(content.locals) module.exports = content.locals;
	// Hot Module Replacement
	if(true) {
		// When the styles change, update the <style> tags
		if(!content.locals) {
			module.hot.accept(2, function() {
				var newContent = __webpack_require__(2);
				if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
				update(newContent);
			});
		}
		// When the module is disposed, remove the <style> tags
		module.hot.dispose(function() { update(); });
	}

/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(3)();
	// imports


	// module
	exports.push([module.id, "/* http://meyerweb.com/eric/tools/css/reset/\n   v2.0 | 20110126\n   License: none (public domain)\n*/\n\nhtml, body, div, span, applet, object, iframe,\nh1, h2, h3, h4, h5, h6, p, blockquote, pre,\na, abbr, acronym, address, big, cite, code,\ndel, dfn, em, img, ins, kbd, q, s, samp,\nsmall, strike, strong, sub, sup, tt, var,\nb, u, i, center,\ndl, dt, dd, ol, ul, li,\nfieldset, form, label, legend,\ntable, caption, tbody, tfoot, thead, tr, th, td,\narticle, aside, canvas, details, embed,\nfigure, figcaption, footer, header, hgroup,\nmenu, nav, output, ruby, section, summary,\ntime, mark, audio, video {\n   margin: 0;\n   padding: 0;\n   border: 0;\n   font-size: 100%;\n   font: inherit;\n   vertical-align: baseline;\n}\n/* HTML5 display-role reset for older browsers */\narticle, aside, details, figcaption, figure,\nfooter, header, hgroup, menu, nav, section {\n   display: block;\n}\nbody {\n   line-height: 1;\n}\nol, ul {\n   list-style: none;\n}\nblockquote, q {\n   quotes: none;\n}\nblockquote:before, blockquote:after,\nq:before, q:after {\n   content: '';\n   content: none;\n}\ntable {\n   border-collapse: collapse;\n   border-spacing: 0;\n}\n\n/* Game Styles */\n\n@font-face {\n    font-family: 'PressStart2P Web';\n    src: url(" + __webpack_require__(4) + ");\n    src: url(" + __webpack_require__(4) + "?#iefix) format('embedded-opentype'),\n         url(" + __webpack_require__(5) + ") format('woff2'),\n         url(" + __webpack_require__(6) + ") format('woff'),\n         url(" + __webpack_require__(7) + ") format('truetype'),\n         url(" + __webpack_require__(8) + "#press_start_2pregular) format('svg');\n    font-weight: normal;\n    font-style: normal;\n}\nbody {\n   font-family: 'PressStart2P Web', monospace;\n   margin: 0 auto;\n   text-align: center;\n}\nh1 {\n   margin-top: 20px;\n}\n#game {\n   background-color: black;\n   display: block;\n   width: 50%;\n   height: auto;\n   margin: 20px auto;\n}\n.players {\n   display: inline-flex;\n   justify-content: space-between;\n   text-align: center;\n   width: 50%;\n}", ""]);

	// exports


/***/ },
/* 3 */
/***/ function(module, exports) {

	/*
		MIT License http://www.opensource.org/licenses/mit-license.php
		Author Tobias Koppers @sokra
	*/
	// css base code, injected by the css-loader
	module.exports = function() {
		var list = [];

		// return the list of modules as css string
		list.toString = function toString() {
			var result = [];
			for(var i = 0; i < this.length; i++) {
				var item = this[i];
				if(item[2]) {
					result.push("@media " + item[2] + "{" + item[1] + "}");
				} else {
					result.push(item[1]);
				}
			}
			return result.join("");
		};

		// import a list of modules into the list
		list.i = function(modules, mediaQuery) {
			if(typeof modules === "string")
				modules = [[null, modules, ""]];
			var alreadyImportedModules = {};
			for(var i = 0; i < this.length; i++) {
				var id = this[i][0];
				if(typeof id === "number")
					alreadyImportedModules[id] = true;
			}
			for(i = 0; i < modules.length; i++) {
				var item = modules[i];
				// skip already imported module
				// this implementation is not 100% perfect for weird media query combinations
				//  when a module is imported multiple times with different media queries.
				//  I hope this will never occur (Hey this way we have smaller bundles)
				if(typeof item[0] !== "number" || !alreadyImportedModules[item[0]]) {
					if(mediaQuery && !item[2]) {
						item[2] = mediaQuery;
					} else if(mediaQuery) {
						item[2] = "(" + item[2] + ") and (" + mediaQuery + ")";
					}
					list.push(item);
				}
			}
		};
		return list;
	};


/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__.p + "public/fonts/pressstart2p-webfont.eot";

/***/ },
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__.p + "public/fonts/pressstart2p-webfont.woff2";

/***/ },
/* 6 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__.p + "public/fonts/pressstart2p-webfont.woff";

/***/ },
/* 7 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__.p + "public/fonts/pressstart2p-webfont.ttf";

/***/ },
/* 8 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__.p + "public/fonts/pressstart2p-webfont.svg";

/***/ },
/* 9 */
/***/ function(module, exports, __webpack_require__) {

	/*
		MIT License http://www.opensource.org/licenses/mit-license.php
		Author Tobias Koppers @sokra
	*/
	var stylesInDom = {},
		memoize = function(fn) {
			var memo;
			return function () {
				if (typeof memo === "undefined") memo = fn.apply(this, arguments);
				return memo;
			};
		},
		isOldIE = memoize(function() {
			return /msie [6-9]\b/.test(window.navigator.userAgent.toLowerCase());
		}),
		getHeadElement = memoize(function () {
			return document.head || document.getElementsByTagName("head")[0];
		}),
		singletonElement = null,
		singletonCounter = 0,
		styleElementsInsertedAtTop = [];

	module.exports = function(list, options) {
		if(false) {
			if(typeof document !== "object") throw new Error("The style-loader cannot be used in a non-browser environment");
		}

		options = options || {};
		// Force single-tag solution on IE6-9, which has a hard limit on the # of <style>
		// tags it will allow on a page
		if (typeof options.singleton === "undefined") options.singleton = isOldIE();

		// By default, add <style> tags to the bottom of <head>.
		if (typeof options.insertAt === "undefined") options.insertAt = "bottom";

		var styles = listToStyles(list);
		addStylesToDom(styles, options);

		return function update(newList) {
			var mayRemove = [];
			for(var i = 0; i < styles.length; i++) {
				var item = styles[i];
				var domStyle = stylesInDom[item.id];
				domStyle.refs--;
				mayRemove.push(domStyle);
			}
			if(newList) {
				var newStyles = listToStyles(newList);
				addStylesToDom(newStyles, options);
			}
			for(var i = 0; i < mayRemove.length; i++) {
				var domStyle = mayRemove[i];
				if(domStyle.refs === 0) {
					for(var j = 0; j < domStyle.parts.length; j++)
						domStyle.parts[j]();
					delete stylesInDom[domStyle.id];
				}
			}
		};
	}

	function addStylesToDom(styles, options) {
		for(var i = 0; i < styles.length; i++) {
			var item = styles[i];
			var domStyle = stylesInDom[item.id];
			if(domStyle) {
				domStyle.refs++;
				for(var j = 0; j < domStyle.parts.length; j++) {
					domStyle.parts[j](item.parts[j]);
				}
				for(; j < item.parts.length; j++) {
					domStyle.parts.push(addStyle(item.parts[j], options));
				}
			} else {
				var parts = [];
				for(var j = 0; j < item.parts.length; j++) {
					parts.push(addStyle(item.parts[j], options));
				}
				stylesInDom[item.id] = {id: item.id, refs: 1, parts: parts};
			}
		}
	}

	function listToStyles(list) {
		var styles = [];
		var newStyles = {};
		for(var i = 0; i < list.length; i++) {
			var item = list[i];
			var id = item[0];
			var css = item[1];
			var media = item[2];
			var sourceMap = item[3];
			var part = {css: css, media: media, sourceMap: sourceMap};
			if(!newStyles[id])
				styles.push(newStyles[id] = {id: id, parts: [part]});
			else
				newStyles[id].parts.push(part);
		}
		return styles;
	}

	function insertStyleElement(options, styleElement) {
		var head = getHeadElement();
		var lastStyleElementInsertedAtTop = styleElementsInsertedAtTop[styleElementsInsertedAtTop.length - 1];
		if (options.insertAt === "top") {
			if(!lastStyleElementInsertedAtTop) {
				head.insertBefore(styleElement, head.firstChild);
			} else if(lastStyleElementInsertedAtTop.nextSibling) {
				head.insertBefore(styleElement, lastStyleElementInsertedAtTop.nextSibling);
			} else {
				head.appendChild(styleElement);
			}
			styleElementsInsertedAtTop.push(styleElement);
		} else if (options.insertAt === "bottom") {
			head.appendChild(styleElement);
		} else {
			throw new Error("Invalid value for parameter 'insertAt'. Must be 'top' or 'bottom'.");
		}
	}

	function removeStyleElement(styleElement) {
		styleElement.parentNode.removeChild(styleElement);
		var idx = styleElementsInsertedAtTop.indexOf(styleElement);
		if(idx >= 0) {
			styleElementsInsertedAtTop.splice(idx, 1);
		}
	}

	function createStyleElement(options) {
		var styleElement = document.createElement("style");
		styleElement.type = "text/css";
		insertStyleElement(options, styleElement);
		return styleElement;
	}

	function createLinkElement(options) {
		var linkElement = document.createElement("link");
		linkElement.rel = "stylesheet";
		insertStyleElement(options, linkElement);
		return linkElement;
	}

	function addStyle(obj, options) {
		var styleElement, update, remove;

		if (options.singleton) {
			var styleIndex = singletonCounter++;
			styleElement = singletonElement || (singletonElement = createStyleElement(options));
			update = applyToSingletonTag.bind(null, styleElement, styleIndex, false);
			remove = applyToSingletonTag.bind(null, styleElement, styleIndex, true);
		} else if(obj.sourceMap &&
			typeof URL === "function" &&
			typeof URL.createObjectURL === "function" &&
			typeof URL.revokeObjectURL === "function" &&
			typeof Blob === "function" &&
			typeof btoa === "function") {
			styleElement = createLinkElement(options);
			update = updateLink.bind(null, styleElement);
			remove = function() {
				removeStyleElement(styleElement);
				if(styleElement.href)
					URL.revokeObjectURL(styleElement.href);
			};
		} else {
			styleElement = createStyleElement(options);
			update = applyToTag.bind(null, styleElement);
			remove = function() {
				removeStyleElement(styleElement);
			};
		}

		update(obj);

		return function updateStyle(newObj) {
			if(newObj) {
				if(newObj.css === obj.css && newObj.media === obj.media && newObj.sourceMap === obj.sourceMap)
					return;
				update(obj = newObj);
			} else {
				remove();
			}
		};
	}

	var replaceText = (function () {
		var textStore = [];

		return function (index, replacement) {
			textStore[index] = replacement;
			return textStore.filter(Boolean).join('\n');
		};
	})();

	function applyToSingletonTag(styleElement, index, remove, obj) {
		var css = remove ? "" : obj.css;

		if (styleElement.styleSheet) {
			styleElement.styleSheet.cssText = replaceText(index, css);
		} else {
			var cssNode = document.createTextNode(css);
			var childNodes = styleElement.childNodes;
			if (childNodes[index]) styleElement.removeChild(childNodes[index]);
			if (childNodes.length) {
				styleElement.insertBefore(cssNode, childNodes[index]);
			} else {
				styleElement.appendChild(cssNode);
			}
		}
	}

	function applyToTag(styleElement, obj) {
		var css = obj.css;
		var media = obj.media;

		if(media) {
			styleElement.setAttribute("media", media)
		}

		if(styleElement.styleSheet) {
			styleElement.styleSheet.cssText = css;
		} else {
			while(styleElement.firstChild) {
				styleElement.removeChild(styleElement.firstChild);
			}
			styleElement.appendChild(document.createTextNode(css));
		}
	}

	function updateLink(linkElement, obj) {
		var css = obj.css;
		var sourceMap = obj.sourceMap;

		if(sourceMap) {
			// http://stackoverflow.com/a/26603875
			css += "\n/*# sourceMappingURL=data:application/json;base64," + btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))) + " */";
		}

		var blob = new Blob([css], { type: "text/css" });

		var oldSrc = linkElement.href;

		linkElement.href = URL.createObjectURL(blob);

		if(oldSrc)
			URL.revokeObjectURL(oldSrc);
	}


/***/ },
/* 10 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	var gameSettings = exports.gameSettings = {
	    gameID: 'game',
	    animationMS: 30,
	    ballColour: 'white',
	    ballNumberInitial: 1,
	    ballSpeed: 1,
	    initialBallVX: 1,
	    initialBallVY: 1,
	    paddleWidth: 5,
	    paddleHeight: 50,
	    paddleSpeed: 5,
	    paddleColourInitial: 0,
	    paddleColours: ['blue', 'green', 'yellow', 'orange', 'red']
	};

/***/ },
/* 11 */
/***/ function(module, exports) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	var player1Keys = exports.player1Keys = {
	    up: 65,
	    down: 90
	};

	var player2Keys = exports.player2Keys = {
	    up: 38,
	    down: 40
	};

/***/ },
/* 12 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
		value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _settings = __webpack_require__(10);

	var _keys = __webpack_require__(11);

	var _Board = __webpack_require__(13);

	var _Board2 = _interopRequireDefault(_Board);

	var _Scoreboard = __webpack_require__(14);

	var _Scoreboard2 = _interopRequireDefault(_Scoreboard);

	var _Paddle = __webpack_require__(15);

	var _Paddle2 = _interopRequireDefault(_Paddle);

	var _Ball = __webpack_require__(16);

	var _Ball2 = _interopRequireDefault(_Ball);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var Game = function () {
		function Game(gameID, canvas) {
			_classCallCheck(this, Game);

			this.canvas = canvas;
			this.context = this.canvas.getContext('2d');
			this.board;
			this.scoreboards = [];
			this.paddles = [];
			this.balls = [];;
		}

		_createClass(Game, [{
			key: 'createBoard',
			value: function createBoard(context, boardHeight, boardWidth) {
				this.board = new _Board2.default(context, boardHeight, boardWidth);
			}
		}, {
			key: 'createScoreboard',
			value: function createScoreboard(context, boardWidth, offSet, alignment, game, score) {
				var scoreboardName = 'scoreboard' + this.scoreboards.length;

				this.scoreboardName = new _Scoreboard2.default(context, boardWidth, offSet, alignment, game, score);
				this.scoreboards.push(this.scoreboardName);
			}
		}, {
			key: 'createPaddle',
			value: function createPaddle(context, boardHeight, x, colour, paddleWidth, paddleHeight, speed, keys) {
				var paddledName = 'paddle' + this.paddles.length;

				this.paddleName = new _Paddle2.default(context, boardHeight, x, colour, paddleWidth, paddleHeight, speed, keys);
				this.paddles.push(this.paddleName);
			}
		}, {
			key: 'createBalls',
			value: function createBalls(context, boardHeight, boardWidth, numberOfBalls) {
				for (var i = 0; i < numberOfBalls; i++) {
					var ballName = 'ball' + i;

					this.createBall(context, boardHeight, boardWidth);
				}
			}
		}, {
			key: 'createBall',
			value: function createBall(context, boardHeight, boardWidth) {
				var balldName = 'ball' + this.balls.length;

				this.ballName = new _Ball2.default(context, boardHeight, boardWidth, _settings.gameSettings.ballColour, _settings.gameSettings.initialBallVY, _settings.gameSettings.initialBallVX, _settings.gameSettings.ballSpeed);

				this.balls.push(this.ballName);
			}
		}, {
			key: 'render',
			value: function render() {
				// board
				this.board.render();

				//scoreboards
				for (var i = 0; i < this.scoreboards.length; i++) {
					this.scoreboards[i].render();
				}

				// paddles
				for (var _i = 0; _i < this.paddles.length; _i++) {
					this.paddles[_i].render();
				}

				// balls
				for (var _i2 = 0; _i2 < this.balls.length; _i2++) {
					this.balls[_i2].render(this.scoreboards[0], this.scoreboards[1], this.paddles[0], this.paddles[1]);
				}
			}
		}]);

		return Game;
	}();

	exports.default = Game;

/***/ },
/* 13 */
/***/ function(module, exports) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var Board = function () {
	    function Board(context, boardHeight, boardWidth) {
	        _classCallCheck(this, Board);

	        this.context = context;
	        this.boardHeight = boardHeight;
	        this.boardWidth = boardWidth;
	    }

	    _createClass(Board, [{
	        key: "drawLine",
	        value: function drawLine() {
	            this.context.fillStyle = 'white';
	            this.context.setLineDash([10, 10]);
	            this.context.beginPath();
	            this.context.moveTo(this.boardWidth / 2, 0);
	            this.context.lineTo(this.boardWidth / 2, this.boardHeight);
	            this.context.strokeStyle = "white";
	            this.context.stroke();
	        }
	    }, {
	        key: "drawBoard",
	        value: function drawBoard() {
	            //context.fillStyle = 'red';
	            //context.fillRect(0, 0, this.boardWidth, this.boardHeight)
	            this.context.clearRect(0, 0, this.boardWidth, this.boardHeight);
	            this.drawLine(this.context);
	        }
	    }, {
	        key: "render",
	        value: function render() {
	            this.drawBoard();
	        }
	    }]);

	    return Board;
	}();

	exports.default = Board;

/***/ },
/* 14 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var Scoreboard = function () {
	    function Scoreboard(context, boardWidth, offSet, alignment, game, score) {
	        _classCallCheck(this, Scoreboard);

	        this.context = context;
	        this.boardWidth = boardWidth;
	        this.offSet = offSet;
	        this.alignment = alignment;
	        this.game = game;
	        this.score = score;
	    }

	    _createClass(Scoreboard, [{
	        key: 'draw',
	        value: function draw() {
	            var x = this.boardWidth / 2 + this.offSet;
	            var y = 10;

	            this.context.font = "25px Helvetica";
	            this.context.textAlign = this.alignment;
	            this.context.textBaseline = 'top';
	            this.context.fillText(this.game + '-' + this.score, x, y);
	        }
	    }, {
	        key: 'render',
	        value: function render() {
	            this.draw();
	        }
	    }]);

	    return Scoreboard;
	}();

	exports.default = Scoreboard;

/***/ },
/* 15 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var Paddle = function () {
	    function Paddle(context, boardHeight, x, colour, paddleWidth, paddleHeight, speed, keys) {
	        var _this = this;

	        _classCallCheck(this, Paddle);

	        this.context = context;
	        this.boardHeight = boardHeight;
	        this.paddleWidth = paddleWidth;
	        this.paddleHeight = paddleHeight;
	        this.speed = speed;
	        this.colour = colour;
	        this.x = x;
	        this.y = this.boardHeight / 2 - this.paddleHeight / 2;
	        this.keys = keys;
	        document.addEventListener('keydown', function (event) {
	            return _this.keyListener(event);
	        });
	    }

	    _createClass(Paddle, [{
	        key: 'keyListener',
	        value: function keyListener(event) {
	            switch (event.keyCode) {
	                case this.keys.up:
	                    this.moveUp();
	                    break;
	                case this.keys.down:
	                    this.moveDown();
	                    break;
	                default:
	                    return;
	            }
	        }
	    }, {
	        key: 'moveUp',
	        value: function moveUp() {
	            if (this.y > 0) {
	                this.y -= this.speed;
	            }
	        }
	    }, {
	        key: 'moveDown',
	        value: function moveDown() {
	            if (this.y + this.paddleHeight < this.boardHeight) {
	                this.y += this.speed;
	            }
	        }
	    }, {
	        key: 'render',
	        value: function render() {
	            this.context.fillStyle = this.colour;
	            this.context.fillRect(this.x, this.y, this.paddleWidth, this.paddleHeight);
	        }
	    }]);

	    return Paddle;
	}();

	exports.default = Paddle;

/***/ },
/* 16 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var Ball = function () {
	    function Ball(context, boardHeight, boardWidth, colour, initialVY, initialVX, initialSpeed) {
	        _classCallCheck(this, Ball);

	        this.context = context;
	        this.boardHeight = boardHeight;
	        this.boardWidth = boardWidth;
	        this.colour = colour;
	        this.initialVY = initialVY;
	        this.initialVX = initialVX;
	        this.speed = initialSpeed;

	        this.vy = Math.floor(Math.random() * 6 - 3);
	        this.vx = this.initialVY; //(7 - Math.abs(this.vy)); 
	        this.y = this.boardHeight / 2;
	        this.x = this.boardWidth / 2;
	        this.radius = 4;
	    }

	    _createClass(Ball, [{
	        key: 'reset',
	        value: function reset() {
	            //this.speed *= 0.5;

	            this.x = this.boardWidth / 2;
	            this.y = this.boardHeight / 2;
	            this.vy = Math.floor(Math.random() * 12 - 6);
	            this.vx = this.initialVY; //(7 - Math.abs(this.vy));

	            if (Math.random() > 0.5) {
	                this.vx *= -1;
	            }
	            if (Math.random() > 0.5) {
	                this.vy *= -1;
	            }
	        }
	    }, {
	        key: 'ballCollisionSound',
	        value: function ballCollisionSound(soundSelect) {
	            var sound = void 0;

	            switch (soundSelect) {
	                case 'paddle':
	                    sound = new Audio('../sounds/pong-01.wav');
	                    sound.play();
	                    break;
	                case 'wall':
	                    sound = new Audio('../sounds/pong-03.wav');
	                    sound.play();
	                    break;
	                case 'score':
	                    sound = new Audio('../sounds/pong-02.wav');
	                    sound.play();
	                    break;
	            }
	        }

	        //paddle collision with ball

	    }, {
	        key: 'paddleCollision',
	        value: function paddleCollision(p1Scoreboard, p2Scoreboard, paddle1, paddle2) {
	            if (this.vx > 0) {
	                // going right

	                // determine if ball at or past right paddle's' left edge
	                var inRightEnd = this.x + this.radius >= paddle2.x;

	                // if past right paddle reverse x direction if paddle hit. Score if not
	                if (inRightEnd) {

	                    //going up
	                    if (this.vy > 0) {
	                        if (this.y + this.radius >= paddle2.y && this.y + this.radius <= paddle2.y + paddle2.paddleHeight && this.x <= paddle2.x) {
	                            this.respondPaddleHit();
	                        } else {
	                            if (this.x >= this.boardWidth) {
	                                this.respondPaddleMiss(p1Scoreboard);
	                            }
	                        }
	                    } else {
	                        if (this.y - this.radius >= paddle2.y && this.y - this.radius <= paddle2.y + paddle2.paddleHeight && this.x <= paddle2.x) {
	                            this.respondPaddleHit();
	                        } else {
	                            if (this.x >= this.boardWidth) {
	                                this.respondPaddleMiss(p1Scoreboard);
	                            }
	                        }
	                    }
	                }
	            } else {
	                // going left

	                // determine if ball is at or past left paddle right edge
	                var inLeftEnd = this.x - this.radius <= paddle1.x + paddle1.paddleWidth;

	                // if past left paddle reverse x direction
	                if (inLeftEnd) {
	                    // going up
	                    if (this.vy > 0) {
	                        if (this.y + this.radius >= paddle1.y && this.y + this.radius <= paddle1.y + paddle1.paddleHeight && this.x >= paddle1.x + paddle1.paddleWidth) {
	                            this.respondPaddleHit();
	                        } else {
	                            if (this.x <= 0) {
	                                this.respondPaddleMiss(p2Scoreboard);
	                            }
	                        }
	                    } else {
	                        if (this.y - this.radius >= paddle1.y && this.y - this.radius <= paddle1.y + paddle1.paddleHeight && this.x >= paddle1.x + paddle1.paddleWidth) {
	                            this.respondPaddleHit();
	                        } else {
	                            if (this.x <= 0) {
	                                this.respondPaddleMiss(p2Scoreboard);
	                            }
	                        }
	                    }
	                }
	            }
	        }
	    }, {
	        key: 'respondPaddleHit',
	        value: function respondPaddleHit() {
	            this.ballCollisionSound('paddle');
	            this.vx *= -1;
	        }
	    }, {
	        key: 'respondPaddleMiss',
	        value: function respondPaddleMiss(scoreBoard) {
	            this.ballCollisionSound('score');

	            scoreBoard.score++;

	            this.reset();
	        }
	    }, {
	        key: 'draw',
	        value: function draw() {
	            this.context.fillStyle = this.colour;
	            this.context.beginPath();
	            this.context.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
	            this.context.fill();
	            this.context.closePath();
	        }
	    }, {
	        key: 'render',
	        value: function render(p1Scoreboard, p2Scoreboard, paddle1, paddle2) {
	            //const hitRight = this.x + this.radius >= this.boardWidth;
	            //const hitLeft = this.x - this.radius <= 0;
	            var hitTop = this.y - this.radius <= 0;
	            var hitBottom = this.y + this.radius >= this.boardHeight;

	            //if (hitLeft || hitRight) {
	            //this.vx *= -1;
	            //}
	            if (hitBottom || hitTop) {
	                this.ballCollisionSound('wall');
	                this.vy *= -1;
	            }

	            this.x += this.vx;
	            this.y += this.vy;

	            this.paddleCollision(p1Scoreboard, p2Scoreboard, paddle1, paddle2);
	            this.draw();
	        }
	    }]);

	    return Ball;
	}();

	exports.default = Ball;

/***/ }
/******/ ]);