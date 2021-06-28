const pool = require('../config/dbConnect')

const signup = (req, res, next) => {

    let record = [
        req.body.username,
        req.body.password
    ]
        
        pool.getConnection((err, connection)=> {

            if (err) throw err; // not connected!
          
            // Use the connection
            connection.query('select * from users where username = (?)', record[0], (error, results)=> {
                
                if (results.length != 0){
                    
                    // If there is alraedy a user
                    res.render('signup', {
                        title: "Sign Up",
                        errors: {
                            msg: "Username taken !"
                        }
                    })
                    
                } else {

                    // Adding user Record to database
                    connection.query('insert into users(username, password) values (?)', [record], (error, results)=> {

                        // User successfully registered (added to the database)
                        req.session.Uid = req.body.username
                        res.redirect('/settings/editprofile')

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


module.exports = signup