/**
 * author-slider-showroom v1.0.0 generated on Tue Aug 06 2019.
 * Built at 15:11:15 GMT-0700 (Pacific Daylight Time)
 * Copyright (c) 2019 Author.io
 */
"use strict";var Demo=new NGNX.VIEW.Registry({selector:".demo",namespace:"demo.",references:{slider:"author-slider"},init:function(){var e=this.ref.slider.element;(window.slider=e).on("slide",function(e){console.log("SLIDE"),console.log("POSITION: ".concat(100*e.detail.x.pct,"%"))}),e.on("change",function(e){console.log("CHANGE"),console.log("PREVIOUS: ".concat(100*e.detail.previous.x.pct,"%")),console.log("NEW:      ".concat(100*e.detail.position.x.pct,"%"))})}});