const Demo = new NGNX.VIEW.Registry({
  selector: '.demo',
  namespace: 'demo.',

  references: {
    slider: 'author-slider'
  },

  init () {
    let slider = this.ref.slider.element
    window.slider = slider

    slider.on('slide', evt => {
      console.log(`SLIDE`)
      console.log(`POSITION: ${evt.detail.x.pct * 100}%`)
    })

    slider.on('change', evt => {
      console.log(`CHANGE`)
      console.log(`PREVIOUS: ${evt.detail.previous.x.pct * 100}%`)
      console.log(`NEW:      ${evt.detail.position.x.pct * 100}%`)
    })
  }
})
