// Copyright (c) 2019 Author.io. MIT licensed.
// @author.io/element-control v1.1.1 available at github.com/author-elements/control
// Last Build: 5/23/2019, 10:25:38 PM
var AuthorFormControlElement = (function () {
  'use strict';

  if (!window.hasOwnProperty('AuthorBaseElement')) {
              console.error('[ERROR] <author-control> Required dependency "AuthorBaseElement" not found.');
              console.info('AuthorBaseElement is available at https://github.com/author-elements/base');
            }
          class AuthorFormControlElement extends AuthorBaseElement(HTMLElement) {
    constructor () {
      super(`<template><style>@charset "UTF-8"; :host{display:block;contain:style;max-width:100%}:host *,:host :after,:host :before{box-sizing:border-box}author-control{display:block;contain:style;max-width:100%}author-control *,author-control :after,author-control :before{box-sizing:border-box}</style><slot></slot></template>`);

      this.UTIL.defineAttributes({
        type: ''
      });

      this.UTIL.defineProperties({
        initialized: {
          private: true,
          default: false
        },

        initialValue: {
          default: null
        },

        labels: {
          readonly: true,
          get: () => this.PRIVATE.labelElements
        },

        labelElements: {
          private: true,
          default: []
        },

        datalist: {
          readonly: true,
          get: () => this.PRIVATE.datalistElement
        },

        datalistElement: {
          private: true,
          default: null
        },

        datalistSourceElement: {
          private: true,
          default: null
        },

        input: {
          readonly: true,
          get: () => this.PRIVATE.inputElement
        },

        inputElement: {
          private: true,
          default: null
        },

        inputSourceElement: {
          private: true,
          default: null
        },

        fieldInputTypes: {
          readonly: true,
          private: true,
          default: [
            'color',
            'date',
            'datetime-local',
            'email',
            'file',
            'hidden',
            'image',
            'month',
            'number',
            'password',
            'range',
            'reset',
            'search',
            'submit',
            'tel',
            'text',
            'time',
            'url',
            'week',
            'textarea'
          ]
        },

        toggleInputTypes: {
          readonly: true,
          private: true,
          default: [
            'checkbox',
            'radio'
          ],
        },

        supportedTypes: {
          readonly: true,
          private: true,
          default: [
            'field',
            'toggle',
            'select'
          ]
        }
      });

      this.UTIL.definePrivateMethods({
        catalogChild: node => {
          switch (node.nodeName) {
            case 'LABEL':
              node.htmlFor = this.PRIVATE.guid;
              this.PRIVATE.labelElements.push(node);
              return

            case 'INPUT':
            case 'TEXTAREA':
              node.id = this.PRIVATE.guid;
              this.PRIVATE.inputSourceElement = node;
              return

            case 'SELECT':
              this.PRIVATE.inputSourceElement = node;
              return

            case 'DATALIST':
              this.PRIVATE.datalistSourceElement = node;
              return

            default: if (node.children.length > 0) {
              Array.from(node.children).forEach(child => this.PRIVATE.catalogChild(child));
            }
          }
        },

        init: () => {
          this.initialValue = this.PRIVATE.inputSourceElement.value;

          switch (this.PRIVATE.inputSourceElement.nodeName) {
            case 'INPUT':
              this.PRIVATE.inputElement = this.PRIVATE.inputSourceElement;

              if (this.PRIVATE.datalistSourceElement) {
                this.type = 'datalist';

                if (!customElements.get('author-datalist')) {
                  this.PRIVATE.initDefaultDatalist();
                  break
                }

                this.PRIVATE.initAuthorDatalist();
                break
              }

              if (this.PRIVATE.fieldInputTypes.indexOf(this.PRIVATE.inputElement.type) >= 0) {
                this.type = 'field';
                break
              }

              if (this.PRIVATE.toggleInputTypes.indexOf(this.PRIVATE.inputElement.type) >= 0) {
                this.type = 'toggle';
                break
              }

              break

            case 'TEXTAREA':
              this.PRIVATE.inputElement = this.PRIVATE.inputSourceElement;
              this.type = 'textarea';
              break

            case 'SELECT':
              this.type = 'select';

              if (!customElements.get('author-select')) {
                this.PRIVATE.initDefaultSelect();
                break
              }

              this.PRIVATE.initAuthorSelect();
              break
          }

          this.UTIL.registerListener(this.input, 'invalid', evt => this.emit('invalid', {}));

          switch (this.type) {
            case 'input':
            case 'textarea':
              // this.UTIL.defineProperties({
              //   leng
              // })

              break

            case 'select':
            case 'datalist':
              this.UTIL.defineProperties({
                length: {
                  readonly: true,
                  get: () => this.input.length
                },

                selectedIndex: {
                  set: value => this.input.selectedIndex = value,
                  get: () => this.input.selectedIndex
                }
              })

              ;[
                'add',
                'deselectAll',
                'addFilter',
                'hasFilter',
                'removeAllFilters',
                'removeFilter',
                'item',
                'namedItem',
                'remove',
                'reportValidity',
                'setCustomValidity'
              ].forEach(method => this[method] = (...args) => this.input[method](...args));

              break
          }

          this.PRIVATE.initialized = true;
          this.emit('initialized');
        },

        initAuthorDatalist: () => {
          let { datalistSourceElement, inputElement, guid } = this.PRIVATE;

          let authorDatalist = document.createElement('author-datalist');

          Array.from(datalistSourceElement.attributes).forEach(attr => {
            if (attr.specified) {
              authorDatalist.setAttribute(attr.name, attr.value);

              if (attr.name === 'autofocus') {
                datalistSourceElement.removeAttribute(attr.name);
              }
            }
          });

          this.removeChild(inputElement);

          // Use a select as sourceElement to preserve option indexes, since
          // datalist doesn't assign indexes to child options
          let surrogate = document.createElement('select');
          Array.from(datalistSourceElement.children).forEach(option => surrogate.add(option));
          surrogate.selectedIndex = -1;

          authorDatalist.inject(inputElement, surrogate, guid);
          this.replaceChild(authorDatalist, datalistSourceElement);
          this.PRIVATE.inputElement = authorDatalist;
        },

        initDefaultDatalist: () => {
          let { datalistSourceElement, inputElement, guid } = this.PRIVATE;

          datalistSourceElement.id = `${guid}_datalist`;
          inputElement.setAttribute('list', datalistSourceElement.id);

          this.PRIVATE.datalistElement = datalistSourceElement;
        },

        initDefaultSelect: () => {
          let { inputSourceElement } = this.PRIVATE;

          inputSourceElement.id = this.PRIVATE.guid;
          inputSourceElement.setAttribute('role', 'menu');

          this.PRIVATE.inputElement = inputSourceElement;
        },

        initAuthorSelect: () => {
          let { inputSourceElement } = this.PRIVATE;
          let authorSelect = document.createElement('author-select');

          authorSelect.id = this.PRIVATE.guid;

          Array.from(inputSourceElement.attributes).forEach(attr => {
            if (attr.specified) {
              authorSelect.setAttribute(attr.name, attr.value);

              if (attr.name === 'autofocus') {
                inputSourceElement.removeAttribute(attr.name);
              }
            }
          });

          authorSelect.inject(inputSourceElement, this.labels);

          this.replaceChild(authorSelect, inputSourceElement);
          this.PRIVATE.inputElement = authorSelect;

          // This is required for label clicks to focus author-select
          this.labels.forEach(label => {
            this.UTIL.registerListener(label, 'click', evt => this.PRIVATE.inputElement.focus());
          });
        }
      });

      this.UTIL.registerListeners(this, {
        connected: () => this.PRIVATE.guid = this.UTIL.generateGuid('control_'),
        rendered: () => {
          Array.from(this.children).forEach(child => this.PRIVATE.catalogChild(child));
          this.PRIVATE.init();
        }
      });
    }

    static get observedAttributes () {
      return ['disabled']
    }

    get value () {
      return this.input.value
    }

    set value (value) {
      this.input.value = value;
    }

    blur () {
      this.input.blur();
    }

    checkValidity () {
      this.input.checkValidity();
    }

    clear () {
      if ('clear' in this.input) {
        return this.input.clear()
      }

      this.input.value = '';
    }

    focus () {
      this.input.focus();
    }
  }

  customElements.define('author-control', AuthorFormControlElement);

  return AuthorFormControlElement;

}());
//# sourceMappingURL=author-control.js.map
