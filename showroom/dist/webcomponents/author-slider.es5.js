// Copyright (c) 2019 Author.io. MIT licensed.
// @author.io/element-slider v1.0.2 available at github.com/author-elements/slider
// Last Build: 8/6/2019, 5:29:25 PM
var AuthorSliderElement = (function () {
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
    console.error('[ERROR] <author-slider> Required dependency "AuthorBaseElement" not found.');
    console.info('AuthorBaseElement is available at https://github.com/author-elements/base');
  }

  (function () {
    var missingDependencies = Array.from(new Set([])).filter(function (dep) {
      return !customElements.get(dep);
    });

    if (missingDependencies.length > 0) {
      console.error("[ERROR] <author-slider> Required dependenc".concat(missingDependencies.length !== 1 ? 'ies' : 'y', " not found: ").concat(missingDependencies.map(function (d) {
        return "<".concat(d, ">");
      }).join(', ').replace(', ' + missingDependencies[missingDependencies.length - 1], ' and ' + missingDependencies[missingDependencies.length - 1])));
      missingDependencies.forEach(function (dep, i) {
        return console.info("".concat(i + 1, ". <").concat(dep, "> is available at ").concat('https://github.com/author-elements/slider'.replace('slider', dep.replace('author-', ''))));
      });
    }
  })();

  var AuthorSliderElement =
  /*#__PURE__*/
  function (_AuthorBaseElement) {
    _inherits(AuthorSliderElement, _AuthorBaseElement);

    function AuthorSliderElement() {
      var _this;

      _classCallCheck(this, AuthorSliderElement);

      _this = _possibleConstructorReturn(this, _getPrototypeOf(AuthorSliderElement).call(this, "<template><style>@charset \"UTF-8\"; :host{contain:content;display:flex}:host *,:host :after,:host :before{box-sizing:border-box}author-slider{contain:content;display:flex}author-slider *,author-slider :after,author-slider :before{box-sizing:border-box}</style><slot></slot></template>"));

      _this.UTIL.defineProperties({
        defaultAxis: {
          private: true,
          readonly: true,
          default: 'x'
        },
        dimensions: {
          private: true,
          readonly: true,
          get: function get() {
            return _this.getBoundingClientRect();
          }
        },
        handles: {
          private: true,
          readonly: true,
          get: function get() {
            return _this.querySelectorAll('author-slider-handle');
          }
        },
        validAxisValues: {
          private: true,
          readonly: true,
          default: ['x', 'y', '*']
        },
        currentPosition: {
          private: true,
          default: {
            x: 0,
            y: 0
          }
        },
        position: {
          private: true,
          default: {
            x: 0,
            y: 0
          }
        },
        previousPosition: {
          private: true,
          default: {
            x: 0,
            y: 0
          }
        }
      });

      _this.UTIL.defineAttributes({
        axis: _this.PRIVATE.defaultAxis
      });

      _this.UTIL.definePrivateMethods({
        generateCoordinates: function generateCoordinates(getX, getY) {
          switch (_this.axis) {
            case '*':
              return {
                x: getX(),
                y: getY()
              };

            case 'x':
              return {
                x: getX(),
                y: null
              };

            case 'y':
              return {
                x: null,
                y: getY()
              };

            default:
              return _this.UTIL.throwError({
                message: !_this.axis ? 'No axis specified' : "Invalid axis \"".concat(_this.axis, "\"")
              });
          }
        },
        generatePositionObject: function generatePositionObject() {
          var position = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : _this.PRIVATE.position;
          var dimensions = _this.PRIVATE.dimensions;

          var getXPos = function getXPos() {
            return {
              px: position.x,
              pct: _this.UTIL.getPercentageDecimal(position.x, dimensions.width)
            };
          };

          var getYPos = function getYPos() {
            return {
              px: position.y,
              pct: _this.UTIL.getPercentageDecimal(position.y, dimensions.height)
            };
          };

          return _this.PRIVATE.generateCoordinates(getXPos, getYPos);
        },
        getRelativePosition: function getRelativePosition(evt) {
          var _this$PRIVATE$dimensi = _this.PRIVATE.dimensions,
              top = _this$PRIVATE$dimensi.top,
              left = _this$PRIVATE$dimensi.left,
              width = _this$PRIVATE$dimensi.width,
              height = _this$PRIVATE$dimensi.height;

          var getXPos = function getXPos() {
            return Math.min(Math.max(evt.pageX - left - pageXOffset, 0), width);
          };

          var getYPos = function getYPos() {
            return Math.min(Math.max(evt.pageY - top - pageYOffset, 0), height);
          };

          return _this.PRIVATE.generateCoordinates(getXPos, getYPos);
        },
        pointermoveHandler: function pointermoveHandler(evt) {
          if (evt.buttons < 1) {
            return;
          }

          document.addEventListener('pointerup', _this.PRIVATE.pointerupHandler);
          var handles = _this.PRIVATE.handles;

          var relative = _this.PRIVATE.getRelativePosition(evt);

          if (!_this.position.x || relative.x !== _this.position.x.px || !_this.position.y || relative.y !== _this.position.y.px) {
            _this.PRIVATE.currentPosition = relative;

            var position = _this.PRIVATE.generatePositionObject(_this.PRIVATE.currentPosition);

            if (handles.length !== 0) {
              handles.item(0).position = position;
            }

            _this.emit('slide', position);
          }
        },
        pointerupHandler: function pointerupHandler(evt) {
          var _this$PRIVATE = _this.PRIVATE,
              currentPosition = _this$PRIVATE.currentPosition,
              handles = _this$PRIVATE.handles,
              pointermoveHandler = _this$PRIVATE.pointermoveHandler,
              pointerupHandler = _this$PRIVATE.pointerupHandler;
          var reposition = true;
          _this.PRIVATE.position = currentPosition;

          if (handles.length > 1) {
            reposition = false;
          } else if (handles.length !== 0) {
            handles.item(0).position = _this.position;
          }

          if (reposition) {
            _this.emit('change', {
              previous: _this.previousPosition,
              position: _this.position
            });

            _this.PRIVATE.previousPosition = currentPosition;
          }

          document.removeEventListener('pointermove', pointermoveHandler);
          document.removeEventListener('pointerup', pointerupHandler);
        }
      });

      _this.UTIL.registerListeners(_assertThisInitialized(_this), {
        'attribute.change': function attributeChange(evt) {
          var _evt$detail = evt.detail,
              attribute = _evt$detail.attribute,
              oldValue = _evt$detail.oldValue,
              newValue = _evt$detail.newValue;

          if (newValue === oldValue) {
            return;
          }

          var _this$PRIVATE2 = _this.PRIVATE,
              defaultAxis = _this$PRIVATE2.defaultAxis,
              validAxisValues = _this$PRIVATE2.validAxisValues;

          switch (attribute) {
            case 'axis':
              var arr = newValue.split(' ').filter(function (axis) {
                return validAxisValues.includes(axis);
              });

              if (!arr.length) {
                _this.setAttribute('axis', defaultAxis);

                return _this.UTIL.throwError({
                  message: "Invalid axis \"".concat(newValue, "\". Valid values include any combination of the following, separated by spaces: \"").concat(validAxisValues.join('", "'), "\"")
                });
              }

              break;
          }
        },
        pointerdown: function pointerdown(evt) {
          var previous = _this.PRIVATE.position;
          _this.PRIVATE.position = _this.PRIVATE.getRelativePosition(evt);
          var _this$PRIVATE3 = _this.PRIVATE,
              handles = _this$PRIVATE3.handles,
              position = _this$PRIVATE3.position,
              pointermoveHandler = _this$PRIVATE3.pointermoveHandler;

          if (handles.length > 1) {
            return;
          }

          if (handles.length !== 0) {
            handles.item(0).position = _this.position;
          }

          _this.emit('change', {
            previous: _this.PRIVATE.generatePositionObject(previous),
            position: _this.position
          });

          document.addEventListener('pointermove', _this.PRIVATE.pointermoveHandler);
        }
      });

      return _this;
    }

    _createClass(AuthorSliderElement, [{
      key: "previousPosition",
      get: function get() {
        return this.PRIVATE.generatePositionObject(this.PRIVATE.previousPosition);
      }
    }, {
      key: "position",
      get: function get() {
        return this.PRIVATE.generatePositionObject(this.PRIVATE.position);
      }
    }], [{
      key: "observedAttributes",
      get: function get() {
        return ['axis'];
      }
    }]);

    return AuthorSliderElement;
  }(AuthorBaseElement(HTMLElement));

  customElements.define('author-slider', AuthorSliderElement);

  return AuthorSliderElement;

}());
//# sourceMappingURL=author-slider.es5.js.map
