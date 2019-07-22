const express = require('express');
const server = express();
server.use(express.urlencoded({extended:true}));
server.use(express.json());
server.listen('2020', () => {
   console.log('Listening on the future....')})