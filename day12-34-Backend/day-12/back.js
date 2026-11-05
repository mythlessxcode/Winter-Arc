const express = require('express');
// require('dotenv').config()
const app = express()
const port = 3000

app.get('/', (req, res) => {
  res.send('Hello World!')
})


app.get('/twitter', (req, res)=>{
    res.send('mythless');
})

app.get('/login', (req, res)=>{
    res.send('<h1>please login at mythless</h1>')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})