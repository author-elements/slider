// Copyright (c) 2019 Author.io. MIT licensed.
// @author.io/element-slider-handle v1.0.3 available at github.com/author-elements/slider-handle
// Last Build: 8/6/2019, 11:28:13 PM
var AuthorSliderHandleElement = (function () {
  'use strict';

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  function _defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ("value" in descriptor) descriptor.writable = true;
      Object.defineProperty(target, descriptor.key, descriptor);
    }
  }

  function _createClass(Constructor, protoProps, staticProps) {
    if (protoProps) _defineProperties(Constructor.prototype, protoProps);
    if (staticProps) _defineProperties(Constructor, staticProps);
    return Constructor;
  }

  function _inherits(subClass, superClass) {
    if (typeof superClass !== "function" && superClass !== null) {
      throw new TypeError("Super expression must either be null or a function");
    }

    subClass.prototype = Object.create(superClass && superClass.prototype, {
      constructor: {
        value: subClass,
        writable: true,
        configurable: true
      }
    });
    if (superClass) _setPrototypeOf(subClass, superClass);
  }

  function _getPrototypeOf(o) {
    _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) {
      return o.__proto__ || Object.getPrototypeOf(o);
    };
    return _getPrototypeOf(o);
  }

  function _setPrototypeOf(o, p) {
    _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) {
      o.__proto__ = p;
      return o;
    };

    return _setPrototypeOf(o, p);
  }

  function _assertThisInitialized(self) {
    if (self === void 0) {
      throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
    }

    return self;
  }

  function _possibleConstructorReturn(self, call) {
    if (call && (typeof call === "object" || typeof call === "function")) {
      return call;
    }

    return _assertThisInitialized(self);
  }

  if (!window.hasOwnProperty('AuthorBaseElement')) {
    console.error('[ERROR] <author-slider-handle> Required dependency "AuthorBaseElement" not found.');
    console.info('AuthorBaseElement is available at https://github.com/author-elements/base');
  }

  (function () {
    var missingDependencies = Array.from(new Set([])).filter(function (dep) {
      return !customElements.get(dep);
    });

    if (missingDependencies.length > 0) {
      console.error("[ERROR] <author-slider-handle> Required dependenc".concat(missingDependencies.length !== 1 ? 'ies' : 'y', " not found: ").concat(missingDependencies.map(function (d) {
        return "<".concat(d, ">");
      }).join(', ').replace(', ' + missingDependencies[missingDependencies.length - 1], ' and ' + missingDependencies[missingDependencies.length - 1])));
      missingDependencies.forEach(function (dep, i) {
        return console.info("".concat(i + 1, ". <").concat(dep, "> is available at ").concat('https://github.com/author-elements/slider-handle'.replace('slider-handle', dep.replace('author-', ''))));
      });
    }
  })();

  var AuthorSliderHandleElement =
  /*#__PURE__*/
  function (_AuthorBaseElement) {
    _inherits(AuthorSliderHandleElement, _AuthorBaseElement);

    function AuthorSliderHandleElement() {
      var _this;

      _classCallCheck(this, AuthorSliderHandleElement);

      _this = _possibleConstructorReturn(this, _getPrototypeOf(AuthorSliderHandleElement).call(this, "<template><style>@charset \"UTF-8\"; :host *,:host :after,:host :before{box-sizing:border-box}author-slider-handle *,author-slider-handle :after,author-slider-handle :before{box-sizing:border-box}</style><slot></slot></template>"));

      _this.UTIL.registerListeners(_assertThisInitialized(_this), {
        connected: function connected() {
          _this.UTIL.insertStyleRules({
            positionRule: ':host {}'
          });
        }
      });

      return _this;
    }

    _createClass(AuthorSliderHandleElement, [{
      key: "position",
      set: function set(_ref) {
        var x = _ref.x,
            y = _ref.y;

        if (!this.PRIVATE.styleRules.hasOwnProperty('positionRule')) {
          return;
        }

        if (x) {
          this.UTIL.setStyleProperty('positionRule', 'left', "".concat(x.pct * 100, "%"));
        }

        if (y) {
          this.UTIL.setStyleProperty('positionRule', 'top', "".concat(y.pct * 100, "%"));
        }
      }
    }]);

    return AuthorSliderHandleElement;
  }(AuthorBaseElement(HTMLElement));

  customElements.define('author-slider-handle', AuthorSliderHandleElement);

  return AuthorSliderHandleElement;

}());
//# sourceMappingURL=author-slider-handle.es5.js.map
