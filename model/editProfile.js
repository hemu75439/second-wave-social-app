const pool = require('../config/dbConnect')


const editProfile = (req, res, next)=> {

    pool.getConnection((err, connection)=> {

        if (err) throw err; // not connected!
              
        // Use the connection
        connection.query('select password from users where username = (?)', req.session.Uid, (error, result)=> {

            if(result[0].password === req.body.password) {

                    connection.query(`update users set bio = (?) where username = "${req.session.Uid}"`, req.body.bio, (error, result)=> {
                        
                        res.render('editProfile', {
                            title: "Edit Profile",
                            username: req.session.Uid,
                            bio: req.body.bio,
                            error: "Profile Changed !"
                        })

                    })

            } else {
                
                res.render('editProfile', {
                    title: "Edit Profile",
                    username: req.session.Uid,
                    bio: req.body.bio,
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


module.exports = editProfile