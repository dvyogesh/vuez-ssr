//window.Promise = require('es6-promise').Promise;
// require('matchmedia-polyfill');
// require('matchmedia-polyfill/matchMedia.addListener');
// require('picturefill');
// require('viewport-units-buggyfill').init();
// window.jQuery = require('jquery');
// require('jquery.cookie');
require('babel-polyfill');

window.RWD = { on() {} };

window.popUp = (url, width, height, scrolls, windowName) => {
  let winOptions;
  if (windowName === 'disableAddToBag') {
    winOptions = `toolbar=yes,location=yes,directories=yes,status=yes,menubar=yes,scrollbars=${scrolls},resizable=yes,copyhistory=no,width=${width},height=${height},top=0,left=0`;
  } else {
    winOptions = `toolbar=no,location=no,directories=no,status=no,menubar=no,scrollbars=${scrolls},resizable=yes,copyhistory=no,width=${width},height=${height},screenX=20,screenY=20`;
  }
  const win = window.open(url, windowName, winOptions);
  if (!win.opener) win.opener = self;
  if (win.focus)win.focus();
};

// Object.assign pollyfill - ie10
if (typeof Object.assign !== 'function') {
  Object.assign = assign;
}

function assign(target, ...args) {
  if (target == null) { // TypeError if undefined or null
    throw new TypeError('Cannot convert undefined or null to object');
  }
  const to = Object(target);
  args.map((nextSource) => {
    if (nextSource != null) {
      return Object.keys(nextSource).forEach((nextKey) => {
        if (Object.prototype.hasOwnProperty.call(nextSource, nextKey)) {
          to[nextKey] = nextSource[nextKey];
        }
      });
    }
    return false;
  });
  return to;
}

// Number.isInteger pollyfill - ie10
Number.isInteger = Number.isInteger || isInteger;

function isInteger(value) {
  return typeof value === 'number' &&
    isFinite(value) &&
    Math.floor(value) === value;
}


// Event propagation path pollyfill
Event.prototype.propagationPath = propagationPath;

function propagationPath() {
  const getPropagation = () => {
    let element = this.target;
    const pathArr = [element];
    if (element === null || element.parentElement === null) {
      return [];
    }
    while (element.parentElement !== null) {
      element = element.parentElement;
      pathArr.unshift(element);
    }
    return pathArr;
  };
  return this.path || (this.composedPath && this.composedPath()) || getPropagation();
}
