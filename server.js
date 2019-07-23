const express = require("express");
const server = express();
const router = require("./auth/authRoute");
const session = require('express-session')
const KnexSessionStore= require('connect-session-knex')(session)
const store = new KnexSessionStore(/* options here */)

server.use(express.urlencoded({ extended: true }));
server.use(express.json());
server.use(
  session({
    name: 'Cherekwa', // default is connect.sid
    secret: 'Okwa esi i ma hacking',
    cookie: {
      maxAge: 1 * 24 * 60 * 60 * 1000,
      secure: false, // only set cookies over https. Server will not send back a cookie over http.
    }, // 1 day in milliseconds
    httpOnly: true, // don't let JS code access cookies. Browser extensions run JS code on your browser!
    resave: false,
    saveUninitialized: false,
    store:store
  })
);
server.use("/api", router);
server.listen("2020", () => {
  console.log("Listening on the future....");
});
