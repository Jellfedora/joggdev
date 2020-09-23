import dotenv from 'dotenv';
dotenv.config();
import express from 'express';
import router from "./router";
import bodyParser from 'body-parser';
import mongoose from 'mongoose';

const fileUpload = require('express-fileupload');
const app: express.Express = express();

const PORT = process.env.PORT || 3001;
const PROD_ADRESS = process.env.PROD_ADRESS
var cors = require('cors')


// setup view engine
app.set('views', 'views');
app.set('view engine', 'pug');

// Autoriser cors
var allowedOrigins = ['http://localhost:3000', PROD_ADRESS];

app.use(cors({
    origin: function (origin, callback) {
        // allow requests with no origin 
        // (like mobile apps or curl requests)
        if (!origin) return callback(null, true);
        if (allowedOrigins.indexOf(origin) === -1) {
            var msg = 'The CORS policy for this site does not ' +
                'allow access from the specified Origin.';
            // return callback(new Error(msg), false); TODO
            return callback(null, true);
        }
        return callback(null, true);
    }
}));

app.use(fileUpload());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));
//routing
app.use(router);

//1. se connecter à la DB
mongoose.connect(process.env.MONGODB_URI, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
    dbName: 'running',
    useFindAndModify: false
},
    (err) => {
        if (err) {
            console.error(err);
            return;
        }

        console.log('mongoose connected');
        //2. lancer l'appli
        app.listen(PORT, () => {
            console.log(`App running on port ${PORT}`);
        });
    });




// TEST WEBSOCKET (ne fonctionne pas en prod)

// var http = require('https');
// var fs = require('fs');
// const server = require('http').createServer(function (req, res) {

//     // Set CORS headers
//     res.setHeader('Access-Control-Allow-Origin', 'ws://sith.hopto.org/:*');
//     res.setHeader("Access-Control-Allow-Methods", "POST, GET, PUT, DELETE, OPTIONS");
//     res.setHeader('Access-Control-Request-Method', '*');
//     res.setHeader('Access-Control-Allow-Methods', 'OPTIONS, GET');
//     res.setHeader('Access-Control-Allow-Headers', '*');
//     if (req.method === 'OPTIONS' || req.method === 'GET') {
//         res.writeHead(200);
//         res.end();
//         return;
//     }

// });


// var io = require('socket.io')(server, {
//     // transports: ['websocket']
// });

// io.of('message').emit("responseNewMap", { mapData: "test" })

// // io.set('origins', 'http://localhost:3000/:*');

// io.on('connection', () => {
//     console.log("socket on 3003!");
// });


// io.sockets.on('connection', function (socket) {
//     console.log('Un client est connecté !');
//     socket.emit('message', 'Serveur connecté');
//     socket.emit("responseNewMap", { mapData: "test" })
// });

// server.listen(3003);