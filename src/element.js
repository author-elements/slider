class AuthorSliderElement extends AuthorBaseElement(HTMLElement) {
  constructor () {
    super(`{{TEMPLATE-STRING}}`)

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
    })

    this.UTIL.defineAttributes({
      axis: this.PRIVATE.defaultAxis
    })

    this.UTIL.definePrivateMethods({
      generatePositionObject: (position = this.PRIVATE.position) => {
        let { dimensions } = this.PRIVATE

        return {
          x: {
            px: position.x,
            pct: this.UTIL.getPercentageDecimal(position.x, dimensions.width)
          },

          y: {
            px: position.y,
            pct: this.UTIL.getPercentageDecimal(position.y, dimensions.height)
          }
        }
      },

      getRelativePosition: evt => {
        let { top, left, width, height } = this.PRIVATE.dimensions

        return {
          x: Math.min(Math.max(evt.pageX - left, 0), width),
          y: Math.min(Math.max(evt.pageY - top, 0), height)
        }
      },

      pointermoveHandler: evt => {
        if (evt.buttons < 1) {
          return
        }

        document.addEventListener('pointerup', this.PRIVATE.pointerupHandler)

        let relative = this.PRIVATE.getRelativePosition(evt)

        if (relative.x !== this.position.x.px || relative.y !== this.position.y.px) {
          this.PRIVATE.currentPosition = relative
          this.emit('slide', this.PRIVATE.generatePositionObject(this.PRIVATE.currentPosition))
        }
      },

      pointerupHandler: evt => {
        let { currentPosition, pointermoveHandler, pointerupHandler } = this.PRIVATE

        this.PRIVATE.position = currentPosition

        this.emit('change', {
          previous: this.previousPosition,
          position: this.position
        })

        this.PRIVATE.previousPosition = currentPosition

        document.removeEventListener('pointermove', pointermoveHandler)
        document.removeEventListener('pointerup', pointerupHandler)
      },
    })

    this.UTIL.registerListeners(this, {
      'attribute.change': evt => {
        let { attribute, oldValue, newValue } = evt.detail

        if (newValue === oldValue) {
          return
        }

        let { defaultAxis, validAxisValues } = this.PRIVATE

        switch (attribute) {
          case 'axis':
            let arr = newValue.split(' ').filter(axis => validAxisValues.includes(axis))

            if (!arr.length) {
              this.setAttribute('axis', defaultAxis)

              return this.UTIL.throwError({
                message: `Invalid axis "${newValue}". Valid values include any combination of the following, separated by spaces: "${validAxisValues.join('", "')}"`
              })
            }

            break
        }
      },

      pointerdown: evt => {
        let previous = this.PRIVATE.position
        this.PRIVATE.position = this.PRIVATE.getRelativePosition(evt)

        let { position, pointermoveHandler } = this.PRIVATE

        this.emit('change', {
          previous: this.PRIVATE.generatePositionObject(previous),
          position: this.position
        })

        document.addEventListener('pointermove', this.PRIVATE.pointermoveHandler)
      }
    })
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

customElements.define('author-slider', AuthorSliderElement)

export default AuthorSliderElement
