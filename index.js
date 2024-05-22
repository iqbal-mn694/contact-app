const express = require('express')
const app = express()
const port = 3000

app.get('/', (req, res) => {
    res.send("list contact")
})

app.listen(port, () => {
    console.log(`Running on port ${port}`)
})