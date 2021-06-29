const { Session } = require('express-session');
const pool = require('../config/dbConnect')


const deleteAccount = (req, res, next)=> {

    pool.getConnection((err, connection)=> {

        if (err) throw err; // not connected!
              
        // Use the connection
        connection.query('select UID from users where username = (?)', req.session.Uid, (error, UID)=> {
                   
            let user = UID[0].UID


            connection.query(`delete from friends where userID = ${user} or friendID = ${user}`, (error, result)=> {})

            connection.query(`delete from friendrequests where senderID = ${user} or rqstID = ${user}`, (error, result)=> {})

            connection.query(`delete from posts where UID = ${user}`, (error, result)=> {})

            connection.query(`delete from users where UID = ${user}`, (error, result)=> {

                Session.remove({'session':{'$regex': '.*"Uid":"'+ req.session.Uid +'".*'}})
                res.redirect('/')

            })
        
        
            // When done with the connection, release it.
            connection.release();
              
        
            // Handle error after the release.
            if (error) throw error;
              
        
            // Don't use the connection here, it has been returned to the pool.
        });

    });

}



module.exports = deleteAccount