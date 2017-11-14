'use strict'

var sendButton = document.getElementById('send-button');
var inputBox = document.getElementById('user-input');

inputBox.focus();

sendButton.onclick = () => {
  createCookie('user', inputBox.innerText.toLowerCase().replace(/\s/g,''), 1);
  let rnum = Math.floor((Math.random() * 5) + 1)
  let clrClass = "color_" + rnum
  createCookie('userClrClass', clrClass, 1);
  inputBox.innerText = '';
  inputBox.focus();
};
