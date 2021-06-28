const pool = require('../config/dbConnect')


const getTimeline = (req, res, next)=> {


    pool.getConnection((err, connection)=> {

        if (err) throw err; // not connected!
              
        connection.query("select UID from users where username = (?)", req.session.Uid, (error, result)=> {

            let userID = result[0].UID
            connection.query("select friendID from friends where userID = (?)", userID, (error, friends)=> {
                    
                let userAndFriends = []
                
                friends.forEach( friend => {
                    userAndFriends.push(friend.friendID)
                });

                // Adding the user in the list
                userAndFriends.push(userID)
                
                // Getting all the post of the user and friends
                let sql_toGetPosts = "select a.username, b.postID, b.content, b.created, b.likes from users a natural join posts b where b.UID in (?) order by created desc"
                    
                connection.query(sql_toGetPosts, [userAndFriends], (error, posts)=> {

                    if(posts.length == 0){

                        res.render('home', {
                            title: "Home",
                            posts: false,
                            msg: "Nothing to show yet !"
                        })

                    } else {
                        
                        posts.forEach( post => {
                            post.created = new Date(post.created).toLocaleTimeString('en-US', { hour: 'numeric', hour12: true, minute: 'numeric' }) + ", " + toShortFormat(new Date(post.created))
                        })
                                
                        res.render('home', {
                            title: "Home",
                            posts: posts,
                            msg: false
                        })

                    }
                        
                })
                    
            });

            // When done with the connection, release it.
            connection.release();

            // Handle error after the release.
            if (error) throw error;
 
        });

    });

}




function toShortFormat(date) {

    let monthNames =["Jan","Feb","Mar","Apr",
                    "May","Jun","Jul","Aug",
                    "Sep", "Oct","Nov","Dec"];

    let day = date.getDate();

    let monthIndex = date.getMonth();
    let monthName = monthNames[monthIndex];

    let year = date.getFullYear();

    return day+ " " + monthName + " " + year;  
    
}


module.exports = getTimeline