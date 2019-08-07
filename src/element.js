class AuthorSliderElement extends AuthorBaseElement(HTMLElement) {
  constructor (templateString = null) {
    super(templateString || `{{TEMPLATE-STRING}}`)

    this.UTIL.defineProperties({
      defaultAxis: {
        private: true,
        default: 'x'
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
    })

    this.UTIL.defineAttributes({
      axis: this.PRIVATE.defaultAxis
    })

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

      generatePositionObject: (position = this.PRIVATE.position) => this.PRIVATE.generateCoordinates(() => ({
        px: position.x,
        pct: this.UTIL.getPercentageDecimal(position.x, this.clientWidth)
      }), () => ({
        px: position.y,
        pct: this.UTIL.getPercentageDecimal(position.y, this.clientHeight)
      })),

      getRelativePosition: evt => {
        return this.PRIVATE.generateCoordinates(() => {
          return Math.min(Math.max(evt.pageX - this.offsetLeft, 0), this.clientWidth)
        }, () => {
          return Math.min(Math.max(evt.pageY - this.offsetTop, 0), this.clientHeight)
        })
      },

      pointerdownHandler: evt => {
        let previous = this.PRIVATE.position
        let reposition = true
        this.PRIVATE.position = this.PRIVATE.getRelativePosition(evt)

        let { handles, position, pointermoveHandler } = this.PRIVATE

        if (handles.length > 1) {
          return
        }

        if (handles.length !== 0) {
          handles.item(0).position = this.position
        }

        this.emit('change', {
          previous: this.PRIVATE.generatePositionObject(previous),
          position: this.position
        })

        document.addEventListener('pointermove', this.PRIVATE.pointermoveHandler)
      },

      pointermoveHandler: evt => {
        if (evt.buttons < 1) {
          return
        }

        document.addEventListener('pointerup', this.PRIVATE.pointerupHandler)

        let { handles } = this.PRIVATE
        let relative = this.PRIVATE.getRelativePosition(evt)

        if ((!this.position.x || relative.x !== this.position.x.px) || (!this.position.y || relative.y !== this.position.y.px)) {
          this.PRIVATE.currentPosition = relative
          let position = this.PRIVATE.generatePositionObject(this.PRIVATE.currentPosition)

          if (handles.length !== 0) {
            handles.item(0).position = position
          }

          this.emit('slide', position)
        }
      },

      pointerupHandler: evt => {
        let { currentPosition, handles, pointermoveHandler, pointerupHandler } = this.PRIVATE
        let reposition = true

        this.PRIVATE.position = currentPosition

        if (handles.length > 1) {
          reposition = false
        } else if (handles.length !== 0) {
          handles.item(0).position = this.position
        }

        if (reposition) {
          this.emit('change', {
            previous: this.previousPosition,
            position: this.position
          })

          this.PRIVATE.previousPosition = currentPosition
        }

        document.removeEventListener('pointermove', pointermoveHandler)
        document.removeEventListener('pointerup', pointerupHandler)
      }
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

      pointerdown: this.PRIVATE.pointerdownHandler
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
