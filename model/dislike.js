const pool = require('../config/dbConnect')


const dislike = (req, res, next)=> {

    pool.getConnection((err, connection)=> {

        if (err) throw err; // not connected!
              
        // Use the connection
        connection.query('update posts set likes = likes-1 where postID = (?)', req.params.postID, (error, results)=> {
                   
            res.send('true')
        
            // When done with the connection, release it.
            connection.release();
              
        
            // Handle error after the release.
            if (error) throw error;
              
        
            // Don't use the connection here, it has been returned to the pool.
        });

    });

}


module.exports = dislike