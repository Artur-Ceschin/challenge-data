const fs = require('fs');
const data = require('../data.json');
const { age, date, education } = require('../utils')

exports.index = function (req, res) {

    let students = data.students.map(function(student){
        const newTeacher = {
            ...student,
            atuation: student.atuation.split(",")
        }
        return newTeacher;
    });


    return res.render('students/index', {students})
}

//CREATE
exports.create =  function(req, res){
    return res.render('students/create')
}

//SHOW
exports.show = function (req, res) {

    const {
        index
    } = req.params

    const foundTeacher = data.students.find(function (student) {
        return student.id == index
    })

    if (!foundTeacher) {
        return res.send("Teacher not found")
    }

    const student = {
        ...foundTeacher,
        age: age(foundTeacher.birth),
        services: foundTeacher.atuation.split(","),
        education_level: education(foundTeacher.education_level),
        created_at: new Intl.DateTimeFormat("pt-BR").format(foundTeacher.created_at),
    }

    return res.render('students/show', { student })
}

//CREATE
exports.post = function (req, res) {

    const keys = Object.keys(req.body);

    for (key of keys) {
        if (req.body[key] == "") {
            return res.send("Fill all fields")
        }
    }

    let {
        avatar_url,
        name,
        birth,
        education_level,
        class_type,
        atuation
    } = req.body

    birth = Date.parse(req.body.birth)
    created_at = Date.now()
    id = Number(data.students.length + 1)

    data.students.push({
        id,
        avatar_url,
        name,
        birth,
        education_level,
        class_type,
        atuation,
        created_at,
    });

    fs.writeFile("data.json", JSON.stringify(data, null, 2), function (error) {
        if (error) {
            return res.send("An error has occurred " + error.message)
        }

        return res.redirect(`/students/${id}`)
    })
}

//EDIT

exports.edit = function(req, res) {

    const { index} = req.params

    const foundTeacher = data.students.find(function (student) {
        return student.id == index
    })

    if (!foundTeacher) {
        return res.send("Teacher not found")
    }

    const student = {
        ...foundTeacher,
        birth: date(foundTeacher.birth),
    }


    return res.render('students/edit', { student })
}

//PUT
exports.put = function (req, res){

    const { id } = req.body

    let index = 0

    const foundTeacher = data.students.find(function(student, foundIndex){
        
       if (id == student.id) {
           index = foundIndex 
           return true
       }
    })
    if (!foundTeacher) return res.send("Instructor not found")

    const student = {
        ...foundTeacher,
        ...req.body,
        birth: Date.parse(req.body.birth),
        id: Number(req.body.id),
    }


    data.students[index] = student

    fs.writeFile("data.json", JSON.stringify(data, null, 2), function (err) {
        if (err) {
            return res.send(err + " Error")
        }

        return res.redirect(`/students/${id}`)
    })


}

//DELETE   
exports.delete = function(req, res){
    const { id } = req.body

    const filteredTeachers = data.students.filter(function(student){

        return student.id != id
    }) 

    data.students = filteredTeachers

    fs.writeFile('data.json', JSON.stringify(data, null, 2), function(err){
        if(err) {
            return res.send('Found an error' + err)
        }

        return res.redirect('/students')
    })
}