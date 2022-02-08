const socket = io();
const msgText = document.querySelector('#msg')
const btnSend = document.querySelector('#btn-send')
const chatBox = document.querySelector('.chat-content')
const displayMsg = document.querySelector('.message')

socket.on('output-messages' , data =>{
    console.log(data)
    if(data.length){
        data.forEach(message => {
            appendMessages(message.msg)
        });
    }
})

let name2;
do {
    name2 = prompt('What is your name?')
} while (!name2)

document.querySelector("#name").textContent = name2
msgText.focus()

btnSend.addEventListener('click', (e) => {
    e.preventDefault()
    sendMsg(msgText.value)
    msgText.value='';
    msgText.focus()
    chatBox.scrollTop = chatBox.scrollHeight;

})

const sendMsg = message => {
    let msg = {
        user: name2,
        message: message.trim()
    }

    display(msg, 'you-message')
 
    socket.emit('sendMessage', msg)
}

socket.on('sendToAll', msg => {
    display(msg, 'other-message')
    chatBox.scrollTop = chatBox.scrollHeight;
})

const display = (msg, type) => {
    const msgDiv = document.createElement('div')
    let className = type
    msgDiv.classList.add(className, 'message-row')
    let times = new Date().toLocaleTimeString()

    let innerText = `
    <div class="message-title">
                <span>${msg.user}</span>
                </div>
               <div class="message-text">
              ${msg.message}
              </div>
             <div class="message-time">
             ${times}
            </div>
    `;
    msgDiv.innerHTML = innerText;
    displayMsg.appendChild(msgDiv)

}