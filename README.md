# Validator

## Description

This plugin validate form

## Initialization

````javaScript
new Validate('.validate-js', options);
````

## Demo
````html
<form action="" class="validate-js" method="POST">
  <label for="name">
    <span>Name</span>
    <input type="text" id="name" name="name" placeholder="Name" data-valid="minLen(2)">
  </label>
  <label for="e-mail">
    <span>E-mail</span>
    <input type="text" id="e-mail" name="e-mail" placeholder="E-mail" data-valid="email|required" />
  </label>
  <input type="submit" value="finish him" class="btn" />
</form>
````
[view demo](https://codepen.io/Zveromag/pen/KZbbzO)

## Options

Values

````javaScript
lang: 'en' // ru, en
onError(errors) {
  //do something
}
onSuccess(event) {
  event.preventDefault();
  //do something
}
````
