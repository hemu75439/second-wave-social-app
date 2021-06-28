
    
    function toggleMode() {
        var btn = document.getElementById("mode")
        var body = document.querySelector('body')

        if(btn.alt == 'light') {
            btn.src = "/src/Moon.svg"
            btn.alt = "dark"
            btn.style.transform = "translate(100%)"
            body.classList.toggle('dark', true)

            localStorage.setItem("SW-mode", "dark");
        } else {
            btn.src = "/src/Sun.svg"
            btn.alt = "light"
            btn.style.transform = "translate(0)"
            body.classList.toggle('dark', false)

            localStorage.setItem("SW-mode", "light");
        }
    }

    function like(btn, postId) {

        if(btn.alt == "like") {
            btn.style.display = "none"

            fetch('/home/like/' + postId, {
                method: 'PUT'
            })
                .then(res => res.json())
                .then(data => {

                    if(data) {
                        btn.src = "/src/Red Heart.svg"
                        btn.alt = "dislike"
                        btn.style.display = ""
                        changeLikes('like', btn)
                    }
                })
                .catch(err => {
                    btn.src = "/src/Heart.svg"
                    btn.alt = "like"
                    btn.style.display = ""
                })
            
        } else {
            btn.style.display = "none"

            fetch('/home/dislike/' + postId, {
                method: 'PUT'
            })
                .then(res => res.json())
                .then(data => {
                    btn.src = "/src/Heart.svg"
                    btn.alt = "like"
                    btn.style.display = ""
                    changeLikes('dislike', btn)
                })
                .catch(err => {
                    btn.src = "/src/Red Heart.svg"
                    btn.alt = "dislike"
                    btn.style.display = ""
                })

        }
    }

    

    function addFrnd(btn, userID) {
        btn.style.display = 'none'

        if(btn.innerText == 'Add Friend') {

            fetch('/friendrequest/sendrequest/' + userID, {
                method: "PUT",
                headers: {
                    'content-type': 'application/json'
                }
            }).then(res => res.json())
                .then(msg => {
                    btn.innerText = msg.msg
                    btn.style.display = ''
                })
                .catch(err => console.log(err))

        } else {

            fetch('/friendrequest/cancelrequest/' + userID, {
                method: "PUT",
                headers: {
                    'content-type': 'application/json'
                }
            }).then(res => res.json())
                .then(msg => {
                    btn.innerText = msg.msg
                    btn.style.display = ''
                })
                .catch(err => console.log(err))

        }
    }

    function acceptRqst(btn, userID) {

        let div = btn.parentNode
        div.remove()

        fetch('/friends/addfriend/' + userID, {
            method: "POST",
            headers: {
                'content-type': "application/json"
            }
        })
    }

    function unfriend(btn, userID) {

        let div = btn.parentNode
        div.remove()

        fetch('/friends/unfriend/' + userID, {
            method: "DELETE",
            headers: {
                'content-type': "application/json"
            }
        })
    }


    function changeLikes(func, img) {

        let div = img.parentNode
        let likes = div.querySelectorAll('span')[2]

        if(func == "like") {
            likes.innerText = parseInt(likes.innerText) + 1
        }

        if(func == "dislike") {
            likes.innerText = parseInt(likes.innerText) - 1
        }

    }
