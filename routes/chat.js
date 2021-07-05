const router = require('express').Router()
const pool = require('../config/dbConnect')
let { onlineUsers } = require('../socket')


router.get('/', (req, res)=> {

    if(Object.keys(onlineUsers).length === 0) {

        res.render('chat', {
            title: "Chat",
            user: req.session.Uid,
            frnds: false
        })

    } else {

        pool.getConnection((err, connection)=> {
    
            if (err) throw err; // not connected!
                  
            // Use the connection
            connection.query('select UID from users where username = (?)', req.session.Uid, (error, UID)=> {
    
                let sql = `select a.username from users a natural join friends b where b.userID = ${UID[0].UID} and b.friendID = a.UID and a.username in (?);`
                       
                connection.query(sql, Object.keys(onlineUsers), (error, frnds)=> {
    
                    if(frnds.length != 0) {
    
                        res.render('chat', {
                            title: "Chat",
                            user: req.session.Uid,
                            frnds: frnds
                        })
    
                    } else {
    
                        res.render('chat', {
                            title: "Chat",
                            user: req.session.Uid,
                            frnds: false
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


})





module.exports = router