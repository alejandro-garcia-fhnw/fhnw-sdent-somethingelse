const express = require('express')
const port = process.env.PORT || 3000
var app = require('express')()
var http = require('http').Server(app)
var io = require('socket.io')(http)

/*
 *  Serve /dist/ folder
 */
app.use(express.static(__dirname + '/dist'))
app.get(/.*/, (req, res) => {
    res.sendFile(__dirname + '/dist/index.html')
})


let clients  = [];

http.listen(port, () => {
    console.log(`Listening on port ${port}`)
})

io.on('connection', (socket) => {

    console.log(`Client ${socket.id} connected to the server.`);
    clients.push(socket);
    console.log("Clients: " + clients.length);



    socket.on('disconnecting', () => {

        clients = clients.filter((client) => {
            return client.id != socket.id
        })
        console.log(`Client ${socket.id} disconnected from the server.`);
        console.log("Clients: " + clients.length);
    })
})
