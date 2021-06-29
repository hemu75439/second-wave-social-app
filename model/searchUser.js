const pool = require('../config/dbConnect')


const searchUser = (req, res, next)=> {

    let user = req.body.search.toString()

    if(user == req.session.Uid) {

        res.render('search', {
            title: "Search",
            users: false,
            search: user,
            msg: "Don't search yourself !"
        })

    } else {

        pool.getConnection((err, connection)=> {

            connection.query('select UID from users where username = (?)', req.session.Uid, (error, UID)=> {

                connection.query('select friendID from friends where userID = (?)', UID[0].UID, (error, friendsID)=> {
    
                    let list = [UID[0].UID]
                    if(friendsID.length !=0){
                        friendsID.forEach(id => {
                            list.push(id.friendID)
                        });
                    }
                    
                    connection.query('select rqstID from friendrequests where senderID = (?)', UID[0].UID, (error, result)=> {

                        if(result.length !=0){
                            result.forEach(id => {
                                list.push(id.rqstID)
                            });
                        }

                        let sql = `select username, bio, UID from users where UID not in(?) and username = "${user}"`
                        connection.query(sql, [list], (error, result)=> {
                    
                            if(result.length != 0) {
                                res.render('search', {
                                    title: "Search",
                                    users: result,
                                    search: user,
                                    msg: false
                                })
                            } else {
                                res.render('search', {
                                    title: "Search",
                                    users: false,
                                    search: user,
                                    msg: "No results found !"
                                })
                            }
                        })

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

}


module.exports = searchUser


