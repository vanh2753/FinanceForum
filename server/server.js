const express = require('express')
const sequelize = require('./config/db')
const app = express()
const port = 8080

// Database connection
const connectDB = async () => {
    try {
        await sequelize.authenticate()
        console.log('Connect DB success')
    } catch (error) {
        console.error('Unable to connect to the database:', error)
    }
}
// Auto connect to database
connectDB()

app.get('/', (req, res) => {
    res.send('Hello World!')
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})