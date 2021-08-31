const express = require('express')
const app = express()
const mysql=require('mysql')
const articleRouter = require('./routes/articles')

require('dotenv').config();
let port = process.env.server_port

const con = mysql.createConnection({
    host: process.env.db_host,
    user: process.env.db_user,
    password:process.env.db_password
})
con.connect(function(err){
    if(err) throw err;
    console.log("Datebase Connected")
})

app.set('view engine', 'ejs')

app.use('/articles', articleRouter)

app.get('/', (req, res) => {
    const articles = [{
        title: 'Article 1',
        CreatedAt: new Date(),
        description: 'This is the first test article 1'
    },
    {
        title: 'Article 2',
        CreatedAt: new Date(),
        description: 'This is the first test article 2'
    },
    {
        title: 'Article 3',
        CreatedAt: new Date(),
        description: 'This is the first test article 3'
    }]
    res.render('articles/index', { articles: articles})
})


app.listen(port,()=>{
    console.log('Server is running on port',port)
})