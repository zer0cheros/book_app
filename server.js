const express = require('express')
const server = express()
const {db } = require('./db')
const bcrypt = require('bcrypt')
server.use(express.static('public'))
server.use(express.urlencoded())

const salt = 10

const db1 = [
    {car: 'BMW', year: 1990},
    {car: 'TOYOTA', year: 2016},
    {car: 'Lexus', year: 2021},
    {car: 'Opel', year: 2000}
]

server.set('view engine', 'ejs')

server.get('/', (req, res)=>{
    res.render('index', {
        user: 'Christian',
        db: db1
    })
})

server.get('/login', (req, res)=>{
    res.render('login')
})
server.get('/signup', (req, res)=>{
    res.render('signup')

})
server.get('/home', (req, res)=>{
    res.render('dashboard')
})

server.post('/signup', async(req, res)=>{
    console.log(req.body);
    const hashedPassword = bcrypt.hashSync(req.body.password,salt)
    await db('user').insert({
        name: req.body.name,
        email: req.body.email,
        password: hashedPassword
    })
    res.redirect('/login')
})

server.post('/login', async(req, res)=>{
    const user = await db('user').select().where({email: req.body.email})
    const comparedPassword = bcrypt.compareSync(req.body.password, user[0].password)
    if(comparedPassword){
        res.render('dashboard', {
            user: user[0].name
        })
    }else {
        res.redirect('/login')
    }
})

server.listen(3000, ()=>{
    console.log('Connected');
})