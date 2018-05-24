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
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
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
/******/ 	return __webpack_require__(__webpack_require__.s = "./frontend/twitter.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./frontend/api_util.js":
/*!******************************!*\
  !*** ./frontend/api_util.js ***!
  \******************************/
/*! no static exports found */
/***/ (function(module, exports) {

const APIUtil = {
  followUser: id => {
    return $.ajax({
      method: 'POST',
      url: `/users/${id}/follow`,
      dataType: "json"
    });
  },
  
  unfollowUser: id => {
    
    return $.ajax({
      type: 'DELETE',
      url: `/users/${id}/follow`,
      dataType: "json"
    });
  },
  
  searchUsers: (queryVal, success) =>{
    return $.ajax({
      type: 'GET',
      url: "/users/search",
      dataType: 'json',
      data: {
        query: queryVal
      }
    });
  }
};


module.exports = APIUtil;

/***/ }),

/***/ "./frontend/follow_toggle.js":
/*!***********************************!*\
  !*** ./frontend/follow_toggle.js ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

const APIUtil = __webpack_require__(/*! ./api_util.js */ "./frontend/api_util.js");

class FollowToggle {
  constructor(el) {
    this.$el = $(el);
    this.userId = this.$el.data('user-id');
    this.followState = this.$el.data('initial-follow-state');
    this.render = this.render.bind(this);
    this.handleClick();
  }
  
  render() {
    if (this.$el.text() === 'Unfollow') {
      this.$el.text("unfollowing");
      this.$el.prop("disabled", true);
    } else if (this.$el.text() === 'unfollowing') {
      this.$el.text('Follow!');
      this.$el.prop("disabled", false);
    } else if (this.$el.text() === 'Follow!') {
      this.$el.text("following");
      this.$el.prop("disabled", true);
    } else if (this.$el.text() === 'following') {
      this.$el.text('Unfollow');
      this.$el.prop("disabled", false);
    }

  }
  
  handleClick() {
    this.$el.on("click", (e) => {
      e.preventDefault();
      this.render();
      if (this.followState === false) {
        APIUtil.followUser(this.userId)
          .then(this.followPromise.bind(this)); 
      } else {
        APIUtil.unfollowUser(this.userId)
          .then(this.followPromise.bind(this));
      }
    });
  }
  
  followPromise(response) {
    if(this.followState){
      this.followState = false;
    }else {
      this.followState = true;
    }
    this.render();
  }
}

module.exports = FollowToggle;

/***/ }),

/***/ "./frontend/twitter.js":
/*!*****************************!*\
  !*** ./frontend/twitter.js ***!
  \*****************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

const FollowToggle = __webpack_require__(/*! ./follow_toggle.js */ "./frontend/follow_toggle.js");
const UsersSearch = __webpack_require__(/*! ./users_search.js */ "./frontend/users_search.js");


window.UsersSearch = UsersSearch;
window.FollowToggle = FollowToggle;

$(() => {
  const $buttons = $('button.follow-toggle');
  $buttons.each((i, el) => {
    let test = new FollowToggle(el);
  });
  const $el = $('nav.users-search');
  const $usersSearch = new UsersSearch($el);
  window.$usersSearch = $usersSearch;
});



/***/ }),

/***/ "./frontend/users_search.js":
/*!**********************************!*\
  !*** ./frontend/users_search.js ***!
  \**********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

const APIUtil = __webpack_require__(/*! ./api_util.js */ "./frontend/api_util.js");

class UsersSearch {
  constructor(el){
    this.$el = $(el);
    this.input = this.$el.find('input');
    this.$ul = this.$el.find("ul.users");
    this.handleInput();
  }
  
  renderResults(data) {
    this.$ul.empty();
    data.forEach(user => {
      let $user = $(`<li><a href="${user.id}">${user.username}</a></li>`);
      
      this.$ul.append($user);
    });
    
  }
  
  handleInput() {
    this.input.on('input', (e) =>{
      APIUtil.searchUsers(this.input.val())
        .then(this.renderResults.bind(this));
    });
  }
}

module.exports = UsersSearch;

/***/ })

/******/ });
//# sourceMappingURL=bundle.js.map