const express = require('express')
const sequelize = require('./config/db')
const handleError = require('./middleware/handleError')
const app = express()
const port = 8080

const authRoutes = require('./routes/auth');

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// Auth routes
app.use('/api', authRoutes)

// Database connection
const connectDB = async () => {
    try {
        await sequelize.authenticate()
        console.log('Connect DB success')
    } catch (error) {
        console.error('Unable to connect to the database:', error)
    }
}
connectDB()// Auto connect to database

app.get('/', (req, res) => {
    res.send('Hello World!')
})

app.use(handleError) // middleware handle error đặt ở cuối

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})