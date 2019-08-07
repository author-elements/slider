// Copyright (c) 2019 Author.io. MIT licensed.
// @author.io/element-slider-handle v1.0.3 available at github.com/author-elements/slider-handle
// Last Build: 8/6/2019, 11:28:13 PM
var AuthorSliderHandleElement = (function () {
  'use strict';

  if (!window.hasOwnProperty('AuthorBaseElement')) {
              console.error('[ERROR] <author-slider-handle> Required dependency "AuthorBaseElement" not found.');
              console.info('AuthorBaseElement is available at https://github.com/author-elements/base');
            }
          (function () {
            let missingDependencies = Array.from(new Set([])).filter(dep => !customElements.get(dep));
            if (missingDependencies.length > 0) {
              console.error(`[ERROR] <author-slider-handle> Required dependenc${missingDependencies.length !== 1 ? 'ies' : 'y'} not found: ${missingDependencies.map(d => `<${d}>`).join(', ').replace(', ' + missingDependencies[missingDependencies.length - 1], ' and ' + missingDependencies[missingDependencies.length - 1])}`);
              missingDependencies.forEach((dep, i) => console.info(`${i+1}. <${dep}> is available at ${'https://github.com/author-elements/slider-handle'.replace('slider-handle', dep.replace('author-', ''))}`));
            }
          })();
          class AuthorSliderHandleElement extends AuthorBaseElement(HTMLElement) {
    constructor () {
      super(`<template><style>@charset "UTF-8"; :host *,:host :after,:host :before{box-sizing:border-box}author-slider-handle *,author-slider-handle :after,author-slider-handle :before{box-sizing:border-box}</style><slot></slot></template>`);

      this.UTIL.registerListeners(this, {
        connected: () => {
          this.UTIL.insertStyleRules({
            positionRule: ':host {}'
          });
        }
      });
    }

    set position ({ x, y }) {
      if (!this.PRIVATE.styleRules.hasOwnProperty('positionRule')) {
        return
      }

      if (x) {
        this.UTIL.setStyleProperty('positionRule', 'left', `${x.pct * 100}%`);
      }

      if (y) {
        this.UTIL.setStyleProperty('positionRule', 'top', `${y.pct * 100}%`);
      }
    }
  }

  customElements.define('author-slider-handle', AuthorSliderHandleElement);

  return AuthorSliderHandleElement;

}());
//# sourceMappingURL=author-slider-handle.js.map
