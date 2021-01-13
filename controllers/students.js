const fs = require('fs');
const data = require('../data.json');
const {date, school_year } = require('../utils')

exports.index = function (req, res) {


    let students = data.students.map(function(student){
        const newStudent = {
            ...student,
            schools: school_year(student.school_year)
        }
        return newStudent;
    });


    return res.render('students/index', {students})

}

//CREATE
exports.create =  function(req, res){
    return res.render('students/create')
}

//POST
exports.post = function (req, res) {

    const keys = Object.keys(req.body);

    for (key of keys) {
        if (req.body[key] == "") {
            return res.send("Fill all fields")
        }
    }


    birth = Date.parse(req.body.birth)
    
    let id = 1

    const Laststudent = data.students[data.students.length - 1]

    if (Laststudent) {
        id = Laststudent.id + 1
    }


    data.students.push({
        id,
        ...req.body,
        birth,
    })



    fs.writeFile("data.json", JSON.stringify(data, null, 2), function (error) {
        if (error) {
            return res.send("An error has occurred " + error.message)
        }

        return res.redirect(`/students/${id}`)
    })
}

//SHOW
exports.show = function (req, res) {

    const {
        index
    } = req.params

    const foundStudent = data.students.find(function (student) {
        return student.id == index
    })

    if (!foundStudent) {
        return res.send("Student not found")
    }

    const student = {
        ...foundStudent,
        school_year: school_year(foundStudent.school_year),
        birth: date(foundStudent.birth).birthDay
    }

    return res.render('students/show', { student })
}



//EDIT

exports.edit = function(req, res) {

    const { index} = req.params

    const foundStudent = data.students.find(function (student) {
        return student.id == index
    })

    if (!foundStudent) {
        return res.send("Student not found")
    }

    const student = {
        ...foundStudent,
        birth: date(foundStudent.birth).iso
    }


    return res.render('students/edit', { student })
}

//PUT
exports.put = function (req, res){

    const { id } = req.body

    let index = 0

    const foundStudent = data.students.find(function(student, foundIndex){
        
       if (id == student.id) {
           index = foundIndex 
           return true
       }
    })
    if (!foundStudent) return res.send("Student not found")

    const student = {
        ...foundStudent,
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

    const filteredStudents = data.students.filter(function(student){

        return student.id != id
    }) 

    data.students = filteredStudents

    fs.writeFile('data.json', JSON.stringify(data, null, 2), function(err){
        if(err) {
            return res.send('Found an error' + err)
        }

        return res.redirect('/students')
    })
}