const pool = require('../config/dbConnect')


const sendRqst = (req, res, next)=> {

    pool.getConnection((err, connection)=> {

        if (err) throw err; // not connected!

        connection.query(`select UID from users where username = (?)`, req.session.Uid, (error, UID)=> {

            let sql = `select * from friendrequests where senderID = ${UID[0].UID} and rqstID = ${req.params.ID}`
            
            // Use the connection
            connection.query(sql, (error, results)=> {
                
                if(results.length != 0) {

                    res.status(200).json({msg: "Cancel Request"})

                } else {

                        let record = [UID[0].UID, req.params.ID]
        
                        connection.query(`insert into friendrequests(senderID, rqstID) values (?)`, [record], (error, results)=> {
                            res.status(200).json({msg: "Cancel Request"})
                        })

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


module.exports = sendRqst