const socket = io();

let user = document.querySelector('.chat-info').dataset.user

socket.emit('newUser', user)


socket.on('newUser', (user)=> {

  fetch(`/friends/isfriend/${user}`)
    .then(res => res.json())
    .then(data => addUser(data, user))
    .catch(err => console.log(err))

})


socket.on('newMsg', (toUser, msg) => recievedMsg(toUser, msg))


socket.on("disconnect", (reason) => {
    if (reason === "io server disconnect") {
      // the disconnection was initiated by the server, you need to reconnect manually
      socket.connect();
    }
    // else the socket will automatically try to reconnect
});


document.querySelector('.send-area').addEventListener('submit', (e) => {
  e.preventDefault()

  let formData = new FormData(document.querySelector('.send-area'))
  let msg = formData.get('msg')
  let toUser = document.querySelector('#chat-frnd').value

  sentMsg(toUser, msg)

  document.querySelector('.send-area input').value = ""
  document.querySelector('.send-area input').focus()
})


function sentMsg(toUser, msg) {

  let newMsg = document.createElement('div')
  newMsg.className = "chat-msg sent"
  newMsg.innerText = msg

  if(toUser === "basic") {
    document.querySelector('#basic-chat').appendChild(newMsg)
    document.querySelector('#basic-chat').scrollTop = document.querySelector('#basic-chat').scrollHeight
  } else {
    socket.emit('chatMsg', toUser, msg)
    document.querySelector(`#${toUser.slice(1)}`).appendChild(newMsg)
    document.querySelector(`#${toUser.slice(1)}`).scrollTop = document.querySelector(`#${toUser.slice(1)}`).scrollHeight
  }

}


function recievedMsg(toUser, msg) {
  let newMsg = document.createElement('div')
  newMsg.className = "chat-msg rec"
  newMsg.innerText = msg

  document.querySelector(`#${toUser.slice(1)}`).appendChild(newMsg)

  if(document.querySelector(`#${toUser.slice(1)}`).style.display == "none") addNoti(toUser)
}


function addUser(data, user) {

  if(data.msg) {
    let c = document.querySelector('#chat-frnd')

    let exists = true

    c.childNodes.forEach(o => {
      if(o.value === user) exists = false
    })

    if(exists) {
      let option = document.createElement('option')
      option.innerText = user
      option.value = user
      option.onclick = "selectChat(this)"
      c.appendChild(option)

      let chatArea = document.createElement('div')
      chatArea.classList.add('chat-area')
      chatArea.id = user.slice(1)
      chatArea.style.display = "none"
      document.querySelector('.chat').insertBefore(chatArea, document.querySelector('.send-area'))
    }
  }

}


function selectChat(selected) {
  document.querySelectorAll('.chat-area').forEach(chat => {
    chat.style.display = "none"
  })
  if(selected.value === "basic") {
    document.querySelector('#basic-chat').style.display = ""
  } else {
    let item = document.querySelector(`#${selected.value.slice(1)}`)
    item.style.display = ""
    item.scrollTop = item.scrollHeight // To scroll to the bottom

    removeNoti(selected.value)
  }
}


function addNoti(toUser) {
  document.querySelectorAll('#chat-frnd option').forEach(user => {
    if(user.value == toUser) {
      user.innerText = user.innerText + "  + M"
    }
  })
}


function removeNoti(toUser) {
  console.log(toUser)
  document.querySelectorAll('#chat-frnd option').forEach(user => {
    if(user.value == toUser && user.value !== "basic") {
      if(user.innerText[user.innerText.length-1] === "M") {
        user.innerText = user.innerText.slice(0, user.innerText.length-5)
      }
    }
  })
}


document.querySelector('.send-area input').focus()