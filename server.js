const express = require('express')
const routes = require('./routes')
const nunjucks = require('nunjucks')

const server = express()


server.use(express.static('public'))
server.use(routes)

server.set('view engine', 'njk')

nunjucks.configure('views', {
    express: server,
    autoescape:false,
    noCache:true,
})



server.listen(5500, function() {
    console.log('Server is running on port 5500')
})