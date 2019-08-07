const Demo = new NGNX.VIEW.Registry({
  selector: '.demo',
  namespace: 'demo.',

  references: {
    slider: 'author-slider',
    handle: 'author-slider-handle'
  },

  init () {
    let { slider, handle } = this.ref
    window.slider = slider.element

    slider.on('slide', evt => {
      console.log(`SLIDE`)
      console.log(`POSITION:`, evt.detail)
    })

    slider.on('change', evt => {
      console.log(`CHANGE`)
      console.log(`PREVIOUS:`, evt.detail.previous)
      console.log('NEW:', evt.detail.position)
    })
  }
})
