const express = require('express')
const app = express()
const port = process.env.PORT || 4000
require('dotenv').config()
const ejsLayouts = require('express-ejs-layouts')
const {session, sessionStore} = require('./config/session')
const auth = require('./config/auth')
const httpServer = require('http').createServer(app);
const { socketSetup } = require('./socket')
socketSetup(httpServer)

app.use(express.static('public'))

app.set('view engine', 'ejs')
app.use(ejsLayouts)

app.use(express.json())
app.use(express.urlencoded({extended: false}))


// Session Setup 
app.use(session({ 
    secret: 'mySecretK1y', 
    resave: true,
    saveUninitialized: false,
    store: sessionStore,
    cookie: {
        maxAge: 1000 * 60 * 60 * 24
    }
})) 


const login = require('./routes/login')
const signup = require('./routes/signup')
const home = require('./routes/home')
const search = require('./routes/search')
const frndRqst = require('./routes/frndRqst')
const frnds = require('./routes/frnds')
const chat = require('./routes/chat')
const settings = require('./routes/settings')



app.get('/', (req, res)=> {
    res.redirect('/login')
})

app.get('/contact-creator', (req, res)=> {
    res.render('contactCreator', {
        title: "Contact Creator"
    })
})

app.use('/login', login)
app.use('/signup', signup)
app.use('/home', auth, home)
app.use('/search', auth, search)
app.use('/friendrequest', auth, frndRqst)
app.use('/friends', auth, frnds)
app.use('/chat', auth, chat)
app.use('/settings', auth, settings)



app.get('/logout', auth, (req, res)=> {
    req.session.destroy()
    res.redirect('/login')
})


const deleteAccount = require('./model/deleteAccount')
app.get('/deleteaccount', auth, deleteAccount)

httpServer.listen(port, ()=> {
    console.log('listening on port : ' + port)
})