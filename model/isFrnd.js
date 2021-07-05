const pool = require('../config/dbConnect')

const isFrnd = (req, res, next) => {

    pool.getConnection((err, connection)=> {

        if (err) throw err; // not connected!
              
        // Use the connection
        connection.query('select UID from users where username = (?)', req.params.user, (error, UID)=> {
                   
            connection.query('select a.username from users a, friends b where b.userID = (?) and a.UID = b.friendID;', UID[0].UID, (error, frnds)=> {

                if(frnds.length != 0) {

                    res.status(200).json({msg: true})

                } else {

                    res.status(200).json({msg: false})
                    
                }

            })
        
        
            // When done with the connection, release it.
            connection.release();
              
        
            // Handle error after the release.
            if (error) throw error;
              
        
            // Don't use the connection here, it has been returned to the pool.
        });

    });

}


module.exports = isFrnd