
const express = require("express");

const server = express();
server.use(express.json())

const projectsRouter = require("./router-api/projectsRouter")
server.use("/api/projects", projectsRouter)

server.get('/',(req,res) => {
    res.send(`Hello YOYO!!`)
})

module.exports = server;