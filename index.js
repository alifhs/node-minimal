const express = require('express')
const app = express()
const port = 3000

app.get('/', (req, res) => {
  throw new Error('Required');
  res.send('Hello World!')
})
app.get('/h', (req, res) => {
    
    res.send('Hello World!')
  })

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})