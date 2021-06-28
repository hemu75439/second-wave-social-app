const pool = require('../config/dbConnect')


const cancelRqst = (req, res, next)=> {

    pool.getConnection((err, connection)=> {

        if (err) throw err; // not connected!

        connection.query(`select UID from users where username = (?)`, req.session.Uid, (error, UID)=> {

            let sql = `select * from friendrequests where senderID = ${UID[0].UID} and rqstID = ${req.params.ID}`
            
            connection.query(sql, (error, results)=> {
                
                if(results.length != 0) {

                    let sql_delete = `delete from friendrequests where senderID = ${UID[0].UID} and rqstID = ${req.params.ID}`
                    connection.query(sql_delete, (error, results)=> {
                        res.status(200).json({msg: "Add Friend"})
                    })

                } else {
                    
                    res.status(200).json({msg: "Add Friend"})

                }
                // When done with the connection, release it.
                connection.release();
                
            
                // Handle error after the release.
                if (error) throw error;
                
            
                // Don't use the connection here, it has been returned to the pool.
            });

        })

    });

}


module.exports = cancelRqst