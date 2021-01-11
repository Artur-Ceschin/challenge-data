const fs = require('fs');
const data = require('../data.json');
const { age, date, education } = require('../utils')

exports.index = function (req, res) {

    let teachers = data.teachers.map(function(teacher){
        const newTeacher = {
            ...teacher,
            atuation: teacher.atuation.split(",")
        }
        return newTeacher;
    });


    return res.render('teachers/index', {teachers})
}

//CREATE   
exports.create = function(req, res){
    return res.render('teachers/create')
}

//SHOW
exports.show = function (req, res) {

    const {
        index
    } = req.params

    const foundTeacher = data.teachers.find(function (teacher) {
        return teacher.id == index
    })

    if (!foundTeacher) {
        return res.send("Teacher not found")
    }

    const teacher = {
        ...foundTeacher,
        age: age(foundTeacher.birth),
        services: foundTeacher.atuation.split(","),
        education_level: education(foundTeacher.education_level),
        created_at: new Intl.DateTimeFormat("pt-BR").format(foundTeacher.created_at),
    }

    return res.render('teachers/show', { teacher })
}

//POST
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
    id = Number(data.teachers.length + 1)

    data.teachers.push({
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

        return res.redirect(`/teachers/${id}`)
    })
}

//EDIT

exports.edit = function(req, res) {

    const { index} = req.params

    const foundTeacher = data.teachers.find(function (teacher) {
        return teacher.id == index
    })

    if (!foundTeacher) {
        return res.send("Teacher not found")
    }

    const teacher = {
        ...foundTeacher,
        birth: date(foundTeacher.birth),
    }


    return res.render('teachers/edit', { teacher })
}

//PUT
exports.put = function (req, res){

    const { id } = req.body

    let index = 0

    const foundTeacher = data.teachers.find(function(teacher, foundIndex){
        
       if (id == teacher.id) {
           index = foundIndex 
           return true
       }
    })
    if (!foundTeacher) return res.send("Instructor not found")

    const teacher = {
        ...foundTeacher,
        ...req.body,
        birth: Date.parse(req.body.birth),
        id: Number(req.body.id),
    }


    data.teachers[index] = teacher

    fs.writeFile("data.json", JSON.stringify(data, null, 2), function (err) {
        if (err) {
            return res.send(err + " Error")
        }

        return res.redirect(`/teachers/${id}`)
    })


}

//DELETE   
exports.delete = function(req, res){
    const { id } = req.body

    const filteredTeachers = data.teachers.filter(function(teacher){

        return teacher.id != id
    }) 

    data.teachers = filteredTeachers

    fs.writeFile('data.json', JSON.stringify(data, null, 2), function(err){
        if(err) {
            return res.send('Found an error' + err)
        }

        return res.redirect('/teachers')
    })
}