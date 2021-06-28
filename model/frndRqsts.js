const pool = require('../config/dbConnect')


const frndRqsts = (req, res, next)=> {

    pool.getConnection((err, connection)=> {

        if (err) throw err; // not connected!
              
        // Use the connection
        connection.query('select UID from users where username = (?)', req.session.Uid, (error, UID)=> {

    
            connection.query('select b.username, b.bio, b.UID from friendrequests a, users b where a.rqstID = (?) and a.senderID = b.UID;', UID[0].UID, (error, rqsts)=> {

                if(rqsts.length != 0) {

                    res.render('frndRqst', {
                        title: "Friend Requests",
                        requests: rqsts,
                        msg: false
                    })

                } else {

                    res.render('frndRqst', {
                        title: "Friend Requests",
                        requests: false,
                        msg: "No Friend Requests !"
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


module.exports = frndRqsts