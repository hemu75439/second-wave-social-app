const pool = require('../config/dbConnect')


const addFrnd = (req, res, next) => {

    pool.getConnection((err, connection)=> {

        if (err) throw err; // not connected!
              
        // Use the connection
        connection.query('select UID from users where username = (?)', req.session.Uid, (error, UID)=> {
                   
            let userID = UID[0].UID
            let friendID = req.params.ID

            connection.query(`delete from friendrequests where senderID = ${friendID} and rqstID = ${userID}`, (error, result)=> {})

            connection.query(`delete from friendrequests where senderID = ${userID} and rqstID = ${friendID}`, (error, result)=> {})

            let sql = `insert into friends(userID, friendID) values (${userID}, ${friendID}), (${friendID}, ${userID})`
                
            connection.query(sql, (error, result)=> {
    
                res.status(200).json({msg : "Done"})
    
            })
        

            // When done with the connection, release it.
            connection.release();
              
        
            // Handle error after the release.
            if (error) throw error;
              
        
            // Don't use the connection here, it has been returned to the pool.
        });

    });

}

module.exports = addFrnd