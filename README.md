# Validator

## Description

This plugin validate form

## Initialization

````javaScript
Validate.run(selectors, options);;
````

## Live demo

[view demo](https://zveromag.github.io/validator/)

## Options

````javaScript
liveChange: true, // realtime validating fields
onError(errors) { //do something with errors object }
onSuccess(event) { event.preventDefault(); //do something }
onChange(field) { // field object }
onReset(event) { // reset form and removing errors}
validators: {
  regex: {
    isHuman: {
      pattern: /^human$/i, // check `word` in the field
      error: 'You must type the word human' // error message
    }
  }
}
````
## Simple localization

````javaScript
Validate.i18n = {
  required: 'Данное поле обязательно для заполнения',
  minLen: 'Минимально допустимое количество символов равно %s%',
  maxLen: 'Максимально допустимое количество символов равно %s%',
  email: 'Поле e-mail имеет неверный формат',
  number: 'Введенные данные должны быть числом',
  equalTo: 'Введенные данные не совпадают'
}
````
