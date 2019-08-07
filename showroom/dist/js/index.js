/**
 * author-slider-showroom v1.0.0 generated on Tue Aug 06 2019.
 * Built at 18:08:40 GMT-0700 (Pacific Daylight Time)
 * Copyright (c) 2019 Author.io
 */
"use strict";var Demo=new NGNX.VIEW.Registry({selector:".demo",namespace:"demo.",references:{slider:"author-slider",handle:"author-slider-handle"},init:function(){var e=this.ref,o=e.slider;e.handle;window.slider=o.element,o.on("slide",function(e){console.log("SLIDE"),console.log("POSITION:",e.detail)}),o.on("change",function(e){console.log("CHANGE"),console.log("PREVIOUS:",e.detail.previous),console.log("NEW:",e.detail.position)})}});