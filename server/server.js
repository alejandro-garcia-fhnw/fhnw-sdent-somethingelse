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


let clients = [];
let game = {};
let games = [];


http.listen(port, () => {
    console.log(`Listening on port ${port}`)
})

io.on('connection', (socket) => {

    console.log(`Client ${socket.id} connected to the server.`);
    clients.push(socket);
    console.log("Clients: " + clients.length);

    // create Game
    socket.on('new_game', (username, gameId) => {
        game = {
            "id": gameId,
            "questions": 10,
            "clients": [username],
            "status": "waiting",
            "clientsReady": []
        }

        games.push(game);
        /*
        socket.emit('update_game', game)
        console.log(username + " created a new Game: " + game.id);*/
        socket.join(gameId);
        io.to(gameId).emit('update_game', game);

    })

    // delete created game
    socket.on('cancel_game', (username, gameId) => {
        if (game.id === gameId) {
            game = {}
            io.to(gameId).emit('update_game', game);
            console.log(username + " deleted the Game: " + gameId);
        }
        console.log("Game ID not found, nothing to delete....");
    })

    // join existing game Max 2 Player
    socket.on('search_game', (gameId, username) => {
        if (username && gameId) {
            let foundGame = games.filter((game) => {
                return game.id === gameId
            })
            console.log(foundGame)
            if (foundGame.length > 0) {
                game = foundGame[0];
                game.clients.push(username)
                console.log(game)
                let msg = username + ' joined the game: ' + gameId;
                socket.emit('alert_client',msg);
                console.log(msg);
                socket.join(gameId);
                io.to(gameId).emit('update_game', game);
            }else {
                socket.emit('alert_client','No Game Found');
                console.log("no game with given gameId found")
            }

        }else{
            socket.emit('alert_client','No GameID or Username given');
            console.log("no gameId oder no username given")
        }
    })
    // remove me from game
    socket.on('remove_game', (username, gameId) => {
        if (username && gameId) {
            let foundGame = games.filter((game) => {
                return game.id === gameId
            })
            if (foundGame.length > 0) {
                game = foundGame[0];
                game.clients.pop()
                console.log(game)
                let msg = username + ' left the game: ' + gameId;
                socket.emit('alert_client',msg);
                console.log(msg);
                socket.join(gameId);
                io.to(gameId).emit('update_game', game);
            }
            else {
                console.log("no game with given gameId found")
            }
        }
        else {
            console.log("no gameId oder no username given")
        }
    })



    socket.on('disconnecting', () => {

        clients = clients.filter((client) => {
            return client.id != socket.id
        })
        console.log(`Client ${socket.id} disconnected from the server.`);
        console.log("Clients: " + clients.length);
    })
})
