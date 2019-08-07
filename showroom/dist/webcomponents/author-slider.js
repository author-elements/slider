// Copyright (c) 2019 Author.io. MIT licensed.
// @author.io/element-slider v1.0.2 available at github.com/author-elements/slider
// Last Build: 8/6/2019, 5:29:25 PM
var AuthorSliderElement = (function () {
  'use strict';

  if (!window.hasOwnProperty('AuthorBaseElement')) {
              console.error('[ERROR] <author-slider> Required dependency "AuthorBaseElement" not found.');
              console.info('AuthorBaseElement is available at https://github.com/author-elements/base');
            }
          (function () {
            let missingDependencies = Array.from(new Set([])).filter(dep => !customElements.get(dep));
            if (missingDependencies.length > 0) {
              console.error(`[ERROR] <author-slider> Required dependenc${missingDependencies.length !== 1 ? 'ies' : 'y'} not found: ${missingDependencies.map(d => `<${d}>`).join(', ').replace(', ' + missingDependencies[missingDependencies.length - 1], ' and ' + missingDependencies[missingDependencies.length - 1])}`);
              missingDependencies.forEach((dep, i) => console.info(`${i+1}. <${dep}> is available at ${'https://github.com/author-elements/slider'.replace('slider', dep.replace('author-', ''))}`));
            }
          })();
          class AuthorSliderElement extends AuthorBaseElement(HTMLElement) {
    constructor () {
      super(`<template><style>@charset "UTF-8"; :host{contain:content;display:flex}:host *,:host :after,:host :before{box-sizing:border-box}author-slider{contain:content;display:flex}author-slider *,author-slider :after,author-slider :before{box-sizing:border-box}</style><slot></slot></template>`);

      this.UTIL.defineProperties({
        defaultAxis: {
          private: true,
          readonly: true,
          default: 'x'
        },

        dimensions: {
          private: true,
          readonly: true,
          get: () => this.getBoundingClientRect()
        },

        handles: {
          private: true,
          readonly: true,
          get: () => this.querySelectorAll('author-slider-handle')
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

      this.UTIL.defineAttributes({
        axis: this.PRIVATE.defaultAxis
      });

      this.UTIL.definePrivateMethods({
        generateCoordinates: (getX, getY) => {
          switch (this.axis) {
            case '*': return {
              x: getX(),
              y: getY()
            }

            case 'x': return {
              x: getX(),
              y: null
            }

            case 'y': return {
              x: null,
              y: getY()
            }

            default: return this.UTIL.throwError({
              message: !this.axis
                ? 'No axis specified'
                : `Invalid axis "${this.axis}"`
            })
          }
        },

        generatePositionObject: (position = this.PRIVATE.position) => {
          let { dimensions } = this.PRIVATE;

          let getXPos = () => ({
            px: position.x,
            pct: this.UTIL.getPercentageDecimal(position.x, dimensions.width)
          });

          let getYPos = () => ({
            px: position.y,
            pct: this.UTIL.getPercentageDecimal(position.y, dimensions.height)
          });

          return this.PRIVATE.generateCoordinates(getXPos, getYPos)
        },

        getRelativePosition: evt => {
          let { top, left, width, height } = this.PRIVATE.dimensions;

          let getXPos = () => Math.min(Math.max(evt.pageX - left - pageXOffset, 0), width);
          let getYPos = () => Math.min(Math.max(evt.pageY - top - pageYOffset, 0), height);

          return this.PRIVATE.generateCoordinates(getXPos, getYPos)
        },

        pointermoveHandler: evt => {
          if (evt.buttons < 1) {
            return
          }

          document.addEventListener('pointerup', this.PRIVATE.pointerupHandler);

          let { handles } = this.PRIVATE;
          let relative = this.PRIVATE.getRelativePosition(evt);

          if ((!this.position.x || relative.x !== this.position.x.px) || (!this.position.y || relative.y !== this.position.y.px)) {
            this.PRIVATE.currentPosition = relative;
            let position = this.PRIVATE.generatePositionObject(this.PRIVATE.currentPosition);

            if (handles.length !== 0) {
              handles.item(0).position = position;
            }

            this.emit('slide', position);
          }
        },

        pointerupHandler: evt => {
          let { currentPosition, handles, pointermoveHandler, pointerupHandler } = this.PRIVATE;
          let reposition = true;

          this.PRIVATE.position = currentPosition;

          if (handles.length > 1) {
            reposition = false;
          } else if (handles.length !== 0) {
            handles.item(0).position = this.position;
          }

          if (reposition) {
            this.emit('change', {
              previous: this.previousPosition,
              position: this.position
            });

            this.PRIVATE.previousPosition = currentPosition;
          }

          document.removeEventListener('pointermove', pointermoveHandler);
          document.removeEventListener('pointerup', pointerupHandler);
        },
      });

      this.UTIL.registerListeners(this, {
        'attribute.change': evt => {
          let { attribute, oldValue, newValue } = evt.detail;

          if (newValue === oldValue) {
            return
          }

          let { defaultAxis, validAxisValues } = this.PRIVATE;

          switch (attribute) {
            case 'axis':
              let arr = newValue.split(' ').filter(axis => validAxisValues.includes(axis));

              if (!arr.length) {
                this.setAttribute('axis', defaultAxis);

                return this.UTIL.throwError({
                  message: `Invalid axis "${newValue}". Valid values include any combination of the following, separated by spaces: "${validAxisValues.join('", "')}"`
                })
              }

              break
          }
        },

        pointerdown: evt => {
          let previous = this.PRIVATE.position;
          this.PRIVATE.position = this.PRIVATE.getRelativePosition(evt);

          let { handles, position, pointermoveHandler } = this.PRIVATE;

          if (handles.length > 1) {
            return
          }

          if (handles.length !== 0) {
            handles.item(0).position = this.position;
          }

          this.emit('change', {
            previous: this.PRIVATE.generatePositionObject(previous),
            position: this.position
          });

          document.addEventListener('pointermove', this.PRIVATE.pointermoveHandler);
        }
      });
    }

    static get observedAttributes () {
      return ['axis']
    }

    get previousPosition () {
      return this.PRIVATE.generatePositionObject(this.PRIVATE.previousPosition)
    }

    get position () {
      return this.PRIVATE.generatePositionObject(this.PRIVATE.position)
    }
  }

  customElements.define('author-slider', AuthorSliderElement);

  return AuthorSliderElement;

}());
//# sourceMappingURL=author-slider.js.map
