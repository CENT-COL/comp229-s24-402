const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const mongoose = require('mongoose');

// add websockets libraries
const http = require('http');
const {server:WebSocketServer} = require('websocket')

dotenv.config();

//Routes
const projectRoutes = require('./routes/project');
const userRoutes = require('./routes/user');

//Instiantiate my DB
mongoose.connect(process.env.MONGODB_URI);

const db = mongoose.connection;
db.on('error', (error) => console.error(error));
db.once('open', () => console.log('Connected to Mongo DB'));

const app = express();

// Add WebSockets Server Features
const server = http.createServer(app);
const wss = new WebSocketServer({httpServer: server});

const clients = []; //store the number of clients connected to the server
const getUnitqueId = () => {
    const s4 = () => Math.floor((1 + Math.random()) * 0x10000).toString(16).substring(1);
    return s4() + s4() + '-' + s4(); // return a unique id sample XXXXXXXX-XXXX
}

wss.on('request', (request) => {
    const userID = getUnitqueId();
    console.log((new Date() + "Received a new connection from origin " + request.origin + "."));    

    try {
        const connection = request.accept(null, request.origin);
        clients[userID] = connection;
        console.log(`connected: ${userID} in ${Object.getOwnPropertyNames(clients)}`);
        
        connection.on('message', (message) => {

            console.log('Received Message', message);
            
            if(message.type === 'utf8') {
                console.log('Received Message', message.utf8Data);
                for(let key in clients){
                    clients[key].sendUTF(message.utf8Data);
                    console.log('Sent Message to: ', clients[key]); 
                }
            }
        });

        connection.on('close', (reasonCode, description) => {
            delete clients[userID];
            console.log((`Client ${userID} has disconnected. Reason: ${reasonCode} - ${description}`));
        
            if(reasonCode=== 1006){
                console.error('Socket Error: read ECONNRESET');
            }
        })

    } catch (error) {
        console.log("Error accepting connection: ", error); 
    }
})


const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

app.use('/api/projects', projectRoutes );
app.use('/api/users', userRoutes );

app.use('/api/data', (req, res, next) => {
    res.status(200).json({message: 'Hello From the Backend'});
})

server.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
})


// app.listen(PORT, () => {
//     console.log(`Server is running on port ${PORT}`);
// })