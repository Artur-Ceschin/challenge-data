const express = require('express')
const routes = express.Router()
const teachers = require('./controllers/teachers')
const students = require('./controllers/students')

routes.get('/', function (req, res){
    return res.redirect('teachers')
})

routes.get('/teachers', teachers.index)
routes.get('/teachers/create', teachers.create)
routes.post('/teachers', teachers.post)
routes.get('/teachers/:index', teachers.show)
routes.get('/teachers/:index/edit', teachers.edit)
routes.put('/teachers', teachers.put)
routes.delete('/teachers', teachers.delete)


routes.get('/students', students.index)
routes.get('/students/create', students.create)
routes.post('/students', students.post)
routes.get('/students/:index', students.show)
routes.get('/students/:index/edit', students.edit)
routes.put('/students', students.put)
routes.delete('/students', students.delete)



module.exports = routes