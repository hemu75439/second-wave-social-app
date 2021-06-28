const pool = require('../config/dbConnect')


const randomSearch = (req, res, next)=> {

    pool.getConnection((err, connection)=> {

        if (err) throw err; // not connected!
              
        connection.query('select UID from users where username = (?)', req.session.Uid, (error, UID)=> {

            connection.query('select friendID from friends where userID = (?)', UID[0].UID, (error, friendsID)=> {

                let list = [UID[0].UID]
                if(friendsID.length !=0){
                    friendsID.forEach(id => {
                        list.push(id.friendID)
                    });
                }
                
                connection.query('select username, bio, UID from users where UID not in(?) order by rand() limit 11;', [list], (error, results)=> {
                     
                    if(results.length != 0) {
                        res.render('search', {
                            title: "Search",
                            users: results,
                            search: false,
                            msg: false
                        })
                    } else {
                        res.render('search', {
                            title: "Search",
                            users: false,
                            search: false,
                            msg: "No results found !"
                        })
                    }
                    
                });

            })

        // When done with the connection, release it.
        connection.release();
              
        
        // Handle error after the release.
        if (error) throw error;
          
    
        // Don't use the connection here, it has been returned to the pool.
        })

    });

}


module.exports = randomSearch