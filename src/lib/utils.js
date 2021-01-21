module.exports = {
    age(timestamp) {

        const today = new Date();
        const birth = new Date(timestamp)


        let age = today.getFullYear() - birth.getFullYear();

        const month = today.getMonth() - birth.getMonth();


        if (month < 0 || month == 0 && today.getDate() < birth.getDate()) {
            age = age - 1
        }

        return age
    },

    date(timestamp) {

        const date = new Date(timestamp)

        const year = date.getUTCFullYear()
        const month = `0${date.getUTCMonth() + 1}`.slice(-2)
        const day = `0${date.getUTCDate()}`.slice(-2)


         return {
             day,
             month,
             year,
            iso: `${year}-${month}-${day}`,
            birthDay:`${day}/${month}`,
            format:`${day}/${month}/${year}`
         }


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
    },
    school_year(school_time) {

        switch (school_time) {
            case "5EF":
                return "5º ano do ensino fundamental"
                break;
            case "6EF":
                return "6º ano do ensino fundamental"
                break;
            case "7EF":
                return "7º ano do ensino fundamental"
                break;
            case "8EF":
                return "8º ano do ensino fundamental"
                break;
            case "9EF":
                return "9º ano do ensino fundamental"
                break;
            case "1EM":
                return "1º ano do ensino médio"
                break;
            case "2EM":
                return "2º ano do ensino médio"
                break;
            case "3EM":
                return "3º ano do ensino médio"
                break;
            default:
                return "Sorry something went wrong"
                break;
        }
    }
}