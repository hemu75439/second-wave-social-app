const pool = require('../config/dbConnect')
const changePassValid = require('../validation/changePassValid')


const changePass = (req, res, next)=> {

    pool.getConnection((err, connection)=> {

        if (err) throw err; // not connected!
              
        // Use the connection
        connection.query('select password from users where username = (?)', req.session.Uid, (error, result)=> {

            if(result[0].password === req.body.currentPassword) {

                if(req.body.newPassword === req.body.confirmPassword) {

                    if(req.body.newPassword === req.body.currentPassword) {

                        res.render('changePass', {
                            title: "Change Password",
                            error: "New and old passwords are same !"
                        })

                    } else {

                        let check = changePassValid(req.body.newPassword)
                        
                        if(check == "ok") {

                            connection.query(`update users set password = (?) where username = "${req.session.Uid}"`, req.body.newPassword, (error, result)=> {
                                
                                res.render('changePass', {
                                    title: "Change Password",
                                    error: "Password changed successfullly !"
                                })
        
                            })

                        } else {

                            res.render('changePass', {
                                title: "Change Password",
                                error: check
                            })

                        }

                    }

                } else {

                    res.render('changePass', {
                        title: "Change Password",
                        error: "Passwords don't match !"
                    })

                }

            } else {
                
                res.render('changePass', {
                    title: "Change Password",
                    error: "Wrong Password !"
                })

            }
        
            // When done with the connection, release it.
            connection.release();
              
        
            // Handle error after the release.
            if (error) throw error;
              
        
            // Don't use the connection here, it has been returned to the pool.
        });

    });

}


module.exports = changePass