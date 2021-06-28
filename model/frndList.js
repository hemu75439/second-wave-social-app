const pool = require('../config/dbConnect')


const frndList = (req, res, next)=> {

    pool.getConnection((err, connection)=> {

        if (err) throw err; // not connected!
              
        // Use the connection
        connection.query('select UID from users where username = (?)', req.session.Uid, (error, UID)=> {
                   
            connection.query('select a.username, a.bio, a.UID from users a, friends b where b.userID = (?) and a.UID = b.friendID;', UID[0].UID, (error, frnds)=> {

                if(frnds.length != 0) {

                    res.render('frnds', {
                        title: "Friend List",
                        friends: frnds,
                        msg: false
                    })

                } else {

                    res.render('frnds', {
                        title: "Friend List",
                        friends: false,
                        msg: "You have no friends !"
                    })

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


module.exports = frndList