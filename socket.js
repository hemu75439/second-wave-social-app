const socketio = require('socket.io')
let onlineUsers = {}

const socketSetup = (httpServer) => {
    const io = socketio(httpServer);

    io.on('connection', socket => {

        socket.on('newUser', (user)=> {
            socket.username = user
            onlineUsers[user] = socket.id

            socket.broadcast.emit('newUser', user)
        })

        socket.on('chatMsg', (toUser, msg) => {
            socket.to(onlineUsers[toUser]).emit('newMsg', socket.username, msg)
        })

        socket.on('disconnect', ()=> {
            socket.emit('userLeft', socket.username)
            delete onlineUsers[socket.username]
        })

    })

}

module.exports = { socketSetup, onlineUsers }