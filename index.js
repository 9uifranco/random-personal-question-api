require('dotenv').config()

const mongoose = require('mongoose');
const express = require('express');
const app = express();
const PORT = 3000;
const { errorHandler } = require('./middleware/errorMiddleware')
app.use(express.json())

mongoose.connect(process.env.DATABASE_URL, { useNewUrlParser:true } )
const db = mongoose.connection

db.on('error', (error) => console.log(error))
db.once('open', () => console.log('Connected to Database'))

app.use(express.urlencoded({ extended: false }))

const questionsRoutes = require('./routes/questions')
const usersRoutes = require('./routes/users')

app.use('/api/questions', questionsRoutes)
app.use('/api/users', usersRoutes)

app.use(errorHandler)

/*

app.get('/tshirt', (req, res) => {
    res.status(200).send({
        tshirt: 'Hering',
        size: 'large'
    })
});

app.post('/tshirt/:id', (req, res) => {
    const { id } = req.params;
    const { logo } = req.body;

    if (!logo) {
        res.status(418).send({ message: 'We need a logo'})
    }

    res.send({
        tshirt: `Hering ${logo} and ID ${id}`,
    })
})
*/
app.listen(
    PORT,
    () => {
        console.log(`It's alive on http://localhost:${PORT}`)
    }
);