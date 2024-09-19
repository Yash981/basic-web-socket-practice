import express from 'express';
import http from 'http';
import { Server } from 'socket.io';



const app = express();
app.use(express.static('./public'));
const server = http.createServer(app);
const io = new Server(server);


//socket.io
io.on('connection', (socket) => {
    socket.on('message', (data) => {
        io.emit('message',{ message: data.message, sender: socket.id })
    })
  });

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/public/index.html');
})
server.listen(3000, () => {
    console.log('listening on *:3000');
});