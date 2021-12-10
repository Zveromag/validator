/**
 * Form Validator - v0.0.11
 * Lightweight form validation plugin
 * https://github.com/Zveromag/validator#readme
 * Copyright (c) 2021 Ivan Kuzmichov,Ivan Tarakanov.
 * MIT License
 */
!function(e,t){"object"==typeof exports&&"undefined"!=typeof module?module.exports=t():"function"==typeof define&&define.amd?define(t):(e=e||self).Validator=t()}(this,(function(){"use strict";function e(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),r.push.apply(r,n)}return r}function t(t){for(var r=1;r<arguments.length;r++){var o=null!=arguments[r]?arguments[r]:{};r%2?e(Object(o),!0).forEach((function(e){n(t,e,o[e])})):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(o)):e(Object(o)).forEach((function(e){Object.defineProperty(t,e,Object.getOwnPropertyDescriptor(o,e))}))}return t}function r(e,t){for(var r=0;r<t.length;r++){var n=t[r];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(e,n.key,n)}}function n(e,t,r){return t in e?Object.defineProperty(e,t,{value:r,enumerable:!0,configurable:!0,writable:!0}):e[t]=r,e}Element.prototype.matches||(Element.prototype.matches=Element.prototype.msMatchesSelector||Element.prototype.webkitMatchesSelector),Element.prototype.closest||(Element.prototype.closest=function(e){var t=this;do{if(t.matches(e))return t;t=t.parentElement||t.parentNode}while(null!==t&&1===t.nodeType);return null});var o={required:function(e,t){var r=!0;switch(e.el.type){case"checkbox":r=e.el.checked;break;case"radio":r=1===t.form.querySelectorAll('[type="radio"][name="'.concat(e.el.name,'"]:checked')).length;break;case"select":case"select-one":case"select-multiple":r=""!==e.el.value;break;default:r="password"===e.el.type?""!==e.el.value:""!==e.el.value.trim()}return r||e.i18n.required},minLen:function(e){return e.el.value.length>=e.param||e.i18n.minLen.replace("%s%",e.param)},maxLen:function(e){return e.el.value.length<=e.param||e.i18n.maxLen.replace("%s%",e.param)},email:function(e){return/^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i.test(e.el.value)||e.i18n.email},equalTo:function(e,t){var r=t.form.querySelector("[name="+e.param+"]");if(r)return r.value.trim()===e.el.value||e.i18n.equalTo},url:function(e){return/^(?:(?:(?:https?|ftp):)?\/\/)(?:\S+(?::\S*)?@)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z0-9\u00a1-\uffff][a-z0-9\u00a1-\uffff_-]{0,62})?[a-z0-9\u00a1-\uffff]\.)+(?:[a-z\u00a1-\uffff]{2,}\.?))(?::\d{2,5})?(?:[/?#]\S*)?$/i.test(e.el.value)||e.i18n.url},number:function(e){return/^(\d+|\.?\d+)$/.test(e.el.value)||e.i18n.number},regex:function(e,t){var r=t.options.validators.regex[e.param];return new RegExp(r.pattern).test(e.el.value)||r.error}},i={required:"This field is required",minLen:"The minimum number of characters allowed is %s%",maxLen:"The maximum allowed number of characters is %s%",email:"The e-mail field has the wrong format",phone:"The phone number is not in the correct format",number:"The entered data must be a number",equalTo:"The entered data does not match",url:"It is not a valid url"},a={showErrors:!0,checkChange:!0,checkInput:!1,checkBlur:!1,containerSelector:".form-group",errorClass:"has-error",errorHintClass:"error-hint",onSuccess:function(){},onError:function(){},onChange:function(){},onReset:function(){}},s=new RegExp(/^(minLen|maxLen|required|equalTo|email|regex|url)\((\w.*)\)/i);return function(){function e(r,n){!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,e),this.options=t(t({},a),n),this.i18n=t(t({},i),e.i18n),this.form=r,this.formSubmit=this.validateForm.bind(this),this.formReset=this.reset.bind(this),this.inputChange=this.validateInput.bind(this),this.bindEvents()}var n,l,c;return n=e,c=[{key:"destroy",value:function(e){e instanceof Node&&(e=[e]),e instanceof NodeList&&(e=[].slice.call(e)),"string"==typeof e&&(e=[].slice.call(document.querySelectorAll(e))),e instanceof Array&&e.forEach((function(e){if("Validator"in e){var t=e.Validator;t.unbindEvents.call(t),t.form.Validator=null,delete t.form.Validator,t.form=null}}))}},{key:"run",value:function(t,r){t instanceof Node&&(t=[t]),t instanceof NodeList&&(t=[].slice.call(t)),"string"==typeof t&&(t=[].slice.call(document.querySelectorAll(t))),t instanceof Array&&t.forEach((function(t){"Validator"in t||(t.Validator=new e(t,r))}))}}],(l=[{key:"check",value:function(e){for(var t=e.value.trim(),r=e.getAttribute("data-valid"),n=[],i={el:e,i18n:this.i18n},a=r.split("|"),l=a.length,c=0;c<l;c++){var u=a[c].match(s),h=void 0;if(u?(h=u[1],void 0!==u[2]&&(i.param=u[2])):h=a[c],(""!==t||"required"===h||"equalTo"===h)&&o.hasOwnProperty(h)){var f=o[h](i,this);if(!0!==f){var d="regex"===h&&i.param?"data-valid-msg-regex-".concat(i.param):"data-valid-msg-".concat(h),p=e.getAttribute(d);f=p||f,n.push(f)}}}return n}},{key:"validateInput",value:function(e){var t=e.target.closest("[data-valid]");if(t){var r={el:t},n=this.check(t);return n.length>0&&(r.errors=n),this.options.showErrors&&this.toggleError(r),this.options.onChange(r)}}},{key:"validateForm",value:function(e){for(var t=[],r=Array.prototype.slice.call(this.form.querySelectorAll("[data-valid]:not(:disabled)")),n=0,o=r.length;n<o;n++){var i=this.check(r[n]);0!==i.length&&t.push({el:r[n],errors:i})}return 0===t.length?this.options.onSuccess(e):(e.preventDefault(),this.options.showErrors&&this.showErrors(t),this.options.onError(t))}},{key:"reset",value:function(e){this.options.showErrors&&this.resetErrors(e.target),this.options.onReset(e)}},{key:"showErrors",value:function(e){var t=this;e.forEach((function(e){t.toggleError(e)}))}},{key:"toggleError",value:function(e){var t=e.el.closest(this.options.containerSelector),r=t.querySelector(".".concat(this.options.errorHintClass));r&&r.parentNode.removeChild(r),e.errors?(t.classList.add(this.options.errorClass),t.insertAdjacentHTML("beforeend",'<div class="'.concat(this.options.errorHintClass,'"> ').concat(e.errors.join("<br>"),"</div>"))):t.classList.remove(this.options.errorClass)}},{key:"resetErrors",value:function(e){var t=this;[].slice.call(e.querySelectorAll(".".concat(this.options.errorClass))).forEach((function(e){e.classList.remove(t.options.errorClass);var r=e.querySelector(".".concat(t.options.errorHintClass));r&&e.removeChild(r)}))}},{key:"bindEvents",value:function(){var e=this;this.form.addEventListener("submit",this.formSubmit),this.form.addEventListener("reset",this.formReset),this.options.checkChange&&this.form.addEventListener("change",this.inputChange),this.options.checkInput&&this.form.addEventListener("input",this.inputChange),this.options.checkBlur&&Array.prototype.slice.call(this.form.querySelectorAll('[data-valid]:not(:disabled):not([type="hidden"])')).forEach((function(t){t.addEventListener("blur",e.inputChange)}))}},{key:"unbindEvents",value:function(){var e=this;this.form.removeEventListener("submit",this.formSubmit),this.form.removeEventListener("reset",this.formReset),this.options.checkChange&&this.form.removeEventListener("change",this.inputChange),this.options.checkInput&&this.form.removeEventListener("input",this.inputChange),this.options.checkBlur&&Array.prototype.slice.call(this.form.querySelectorAll('[data-valid]:not(:disabled):not([type="hidden"])')).forEach((function(t){t.removeEventListener("blur",e.inputChange)}))}}])&&r(n.prototype,l),c&&r(n,c),e}()}));
