module.exports = {
    age: function age(timestamp) {

        const today = new Date();
        const birth = new Date(timestamp)


        let age = today.getFullYear() - birth.getFullYear();

        const month = today.getMonth() - birth.getMonth();


        if (month < 0 || month == 0 && today.getDate() < birth.getDate()) {
            age = age - 1
        }

        return age
    },

    date: function date(timestamp) {

        const date = new Date(timestamp)

        const year = date.getUTCFullYear()
        const month = `0${date.getUTCMonth() + 1}`.slice(-2)
        const day = `0${date.getUTCDate()}`.slice(-2)


        return `${year}-${month}-${day}`

    },

    education: function education_schooling(school) {

        switch (school) {
            case "EM":
                return "Ensino Médio"
                break;
            case "ES":
                return "Ensino Superior"
                break;

            case "M":
                return "Mestrado"
                break;

            case "D":
                return "Doutorado"
                break;
            default:
                return "Sorry something went wrong"
                break;
        }
    }
}