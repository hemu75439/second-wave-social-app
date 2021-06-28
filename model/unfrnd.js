const pool = require('../config/dbConnect')


const unfrnd = (req, res, next) => {

    pool.getConnection((err, connection)=> {

        if (err) throw err; // not connected!
              
        // Use the connection
        connection.query('select UID from users where username = (?)', req.session.Uid, (error, UID)=> {
                   
            let userID = UID[0].UID
            let friendID = req.params.ID

            connection.query(`delete from friends where userID = ${friendID} and friendID = ${userID}`, (error, result)=> {

                connection.query(`delete from friends where userID = ${userID} and friendID = ${friendID}`, (error, result)=> {

                    res.status(200).json({msg : "Done"})

                })

            })

            // When done with the connection, release it.
            connection.release();
              
        
            // Handle error after the release.
            if (error) throw error;
              
        
            // Don't use the connection here, it has been returned to the pool.
        });

    });

}

module.exports = unfrnd