/* Validator methods */
export default {
  required(obj, form) {

    let isCheck = true;

    switch (obj.el.type) {
      case 'checkbox':
        isCheck = obj.el.checked;
        break;

      case 'radio':
        const radioBtns = form.querySelectorAll(`[type="radio"][name="${obj.el.name}"]:checked`);
        isCheck = radioBtns.length === 1;
        break;

      case 'select':
      case 'select-one':
      case 'select-multiple':
        isCheck = obj.el.value !== '';
        break;

      default:  isCheck = obj.el.value.trim() !== '';
    }

    return isCheck || obj.i18n.required;
  },
  minLen(obj) {
    return obj.el.value.length >= obj.param || obj.i18n.minLen.replace('%s%', obj.param);
  },
  maxLen(obj) {
    return obj.el.value.length <= obj.param || obj.i18n.maxLen.replace('%s%', obj.param);
  },
  email(obj) {
    return /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i.test(obj.el.value) || obj.i18n.email;
  },
  phone(obj) {
    return /^\d[\d\(\)\ -]{4,14}\d$/.test(obj.el.value) || obj.i18n.phone;
  },
  equalTo(obj, form) {
    const equalVal = form.querySelector('[name=' + obj.param + ']');
    if (!equalVal) return;

    const val = equalVal.value.trim();
    return val === obj.el.value || obj.i18n.equalTo;
  },
  number(obj) {
    return /^(\d+|\.?\d+)$/.test(obj.el.value) || obj.i18n.number;
  },
};
