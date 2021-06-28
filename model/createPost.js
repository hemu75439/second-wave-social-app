const pool = require('../config/dbConnect')


const createPost = (req, res, next)=> {

    pool.getConnection((err, connection)=> {

        if (err) throw err; // not connected!
              
        // Use the connection
        connection.query('select UID from users where username = (?)', req.session.Uid, (error, result)=> {
                   
            let record = [
                result[0].UID,
                req.body.content,
                new Date()
            ]

            connection.query('insert into posts(UID, content, created) values (?)', [record], (error, results)=> {

                res.redirect('/home')

            })
        
        
            // When done with the connection, release it.
            connection.release();
              
        
            // Handle error after the release.
            if (error) throw error;
              
        
            // Don't use the connection here, it has been returned to the pool.
        });

    });

}



module.exports = createPost