const mongoose = require('mongoose')
const Msg = require('./models/messages');
const { Socket } = require('dgram')
const express = require('express')
const path = require('path')
const { Console } = require('console')

const mongoDB = 'mongodb+srv://Tahani:1234@cluster0.fx5bx.mongodb.net/myFirstDatabase?retryWrites=true&w=majority';
mongoose.connect(mongoDB ,{useNewUrlParser:true,
    useUnifiedTopology:true}).then(()=>{
    console.log('connected')
}).catch(err => console.log(err)) 
const app = express()
const http = require('http').createServer(app)

app.use(express.static(path.join(__dirname, 'public')))

const io = require('socket.io')(http)
io.on('connection', socket => {
    console.log('connected Ready')
    Msg.find().then(result  =>{
        socket.emit('output-messages',result)
    })

    //message  
    socket.on('sendMessage', msg => {
        //console.log(msg)
        const message =new Msg({msg});
        message.save().then(()=>{
            
        })
        socket.broadcast.emit('sendToAll', msg)
    })
})

const PORT = process.env.PORT || 3000
http.listen(PORT, () => {
    console.log("server is runningon port ", PORT)
})