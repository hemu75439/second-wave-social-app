

const changePassValid = (password) => {

    if(password.length >= 6) {

        if(/^[a-zA-Z@]+$/i.test(password)) {

            return "ok"

        } else {
            
            return "Password must only contain a-z, A-Z, @"

        }
    
    } else {
        
        return "Password min. length 6 characters"

    }

}

module.exports = changePassValid