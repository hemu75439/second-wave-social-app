const pool = require('../config/dbConnect')


const login = (req, res, next) => {

    let Username = req.body.username;
    let Password = req.body.password;


    pool.getConnection((err, connection)=> {

        if (err) throw err; // not connected!
              
        // Use the connection
        connection.query('select * from users where username = (?)', Username, (error, results)=> {
                   
            if (results.length == 0){

                // If there no such user
                res.render('login', {
                    title: "Login",
                    errors: {
                        msg: "Wrong Email or Password.!"
                    }
                })
                        
            }else {

                if(results[0].password === Password){

                    // If every credentials are correct

                    // Start session for the user
                    req.session.Uid = req.body.username

                    res.redirect('/home')
                            
                } else {

                    // If there is a user but wrong password
                    res.render('login', {
                        title: "Login",
                        errors: {
                            msg: "Wrong Email or Password.!"
                        }
                    })

                }

            }
        
        
            // When done with the connection, release it.
            connection.release();
              
        
            // Handle error after the release.
            if (error) throw error;
              
        
            // Don't use the connection here, it has been returned to the pool.
        });

    });

}

module.exports = login