// import Messages from './messages';

export default {
  required(obj) {
    return obj.el.value.trim() !== '' || obj.lang.required;
  },
  minLen(obj) {
    return obj.el.value.length >= obj.param || obj.lang.minLen.replace('%s%', obj.param);
  },
  maxLen(obj) {
    return obj.el.value.length <= obj.param || obj.lang.maxLen.replace('%s%', obj.param);
  },
  email(obj) {
    return /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i.test(obj.el.value) || obj.lang.email;
  },
  phone(obj) {
    return /^\d[\d\(\)\ -]{4,14}\d$/.test(obj.el.value) || obj.lang.phone;
  },
  equalTo(obj) {
    var equalVal = form.querySelector('[name=' + obj.el.param + ']').value;

    return equalVal === obj.el.value || obj.lang.equalTo;
  },
  number(obj) {
    return /^(\d+|\.?\d+)$/.test(obj.el.value) || obj.lang.number;
  },
};
