const pool = require('../config/dbConnect')


const viewProfile = (req, res, next)=> {


    pool.getConnection((err, connection)=> {

        if (err) throw err; // not connected!
              
        // Use the connection
        connection.query('select bio from users where username = (?)', req.session.Uid, (error, result)=> {
                   
            res.render('editProfile', {
                title: "Edit Profile",
                username: req.session.Uid,
                bio: result[0].bio,
                error: false
            })
        
        
            // When done with the connection, release it.
            connection.release();
              
        
            // Handle error after the release.
            if (error) throw error;
              
        
            // Don't use the connection here, it has been returned to the pool.
        });

    });
    
}


module.exports = viewProfile