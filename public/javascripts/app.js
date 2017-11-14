/**
 * @file Just Talk Web App
 * @author Bruno Lombardi <djfrizer1@gmail.com>
 * @version 1.2.0
 */
'use strict'

const socket = io.connect('https://fea81cfa.ngrok.io/')

const inputBox = document.getElementById('message-input')
const sendButton = document.getElementById('send-button')
const messagesDiv = document.getElementById('messages')
const usersOnline = document.getElementById('users-online')

console.log('carregado')

socket.on('con users', conUsers => {
  console.log('Usuários online: ' + conUsers)
  //usersOnline.innerText = conUsers + ' usuários conectados.'
})

inputBox.contentEditable = "true"
inputBox.focus()

/**
 * Listen for server event 'new message', and run function addNewMessage
 * @type {Event}
 */
socket.on('new message', addNewMessage)

/**
 * Listen for Enter key pressed by user.
 * @type {Event}
 */
inputBox.addEventListener('keydown', event => {
  let height = inputBox.clientHeight
  console.log('height: ' + height)
  if(height >= 99) {
    inputBox.style.overflowY = 'scroll'
  } else {
    inputBox.style.overflowY = 'hidden'
  }
  console.log('keycode: ' + event.keyCode)

  if(event.keyCode == 13 && inputBox.innerText != '') {
    event.preventDefault()
    //let message = event.target.value
    let message = { username: readCookie('user'), content: inputBox.innerText, date: srvTime() }
    sendMessage(message)
    inputBox.innerText = ''
    inputBox.innerText.replace(/(\r\n|\n|\r)/gm,"")
    inputBox.focus()
  }

})

/**
 * Sends message to the server when sendButton is clicked.
 * @return {void}
 */
sendButton.onclick = () => {
  console.log('clicou')
  let message = { username: readCookie('user'), content: inputBox.innerText, date: srvTime() }
  if(message.content != '') {
    sendMessage(message)
    inputBox.innerText = ''
    inputBox.focus()
  }
}

/**
 * Sends the message to the server.
 * @param  {Object} message An object with the message text and the current server date.
 * @return {void}         returns nothing
 */
function sendMessage(message) {
  socket.emit('new message', message)
  addNewMessage(message)
}

/**
 * Adds a new message to the page
 * @param {Object} message An object with the message text and the current server date.
 */
function addNewMessage(message) {
  let msg = document.createElement('div')
  msg.classList.add('msg')

  let user = document.createElement('span')
  user.classList.add('username')
  user.innerText = message.username
  user.classList.add(readCookie('userClrClass'))

  let p = document.createElement('p')
  p.innerText = message.content

  let d = document.createElement('span')
  d.innerText = dateFormat(message.date, "HH:MM")

  msg.appendChild(p)
  msg.appendChild(d)
  let wrap = document.createElement('div')
  wrap.classList.add('wrap')

  wrap.appendChild(user)
  wrap.appendChild(msg)

  messagesDiv.insertBefore(wrap, messagesDiv.children[0])
  msg.classList.add('fade')
}
