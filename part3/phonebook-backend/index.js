const express = require('express')
const app = express()
const morgan = require('morgan')
const cors = require('cors')
const Person = require('./models/person')
require('dotenv').config()

app.use(express.json())
app.use(morgan('tiny'))
app.use(cors())
app.use(express.static('dist'))

// not a good practice to show data in console
// morgan.token('body', (req) => {
//     if (req.method === 'POST' && req.body && req.body.name && req.body.number) {
//         return `{name: ${req.body.name}, number: ${req.body.number}}`;
//     }
//     return '';
// });

// app.use(morgan(':method :url :status :res[content-length] - :response-time ms :body'));

app.get('/api/persons', (request, response) => {
    Person.find({}).then(persons => {
        response.json(persons);
    }).catch(error => {
        response.status(500).json({ error: 'Internal Server Error' });
    });
});

app.get('/api/persons/:id', (request, response) => {
    const id = request.params.id;
    Person.findById(id).then(person => {
        if (person) {
            response.json(person);
        } else {
            response.status(404).end();
        }
    }).catch(error => {
        response.status(500).json({ error: 'Internal Server Error' });
    });
});

app.get('/info', (request, response) => {
    Person.find({}).then(persons => {
        const peopleNumber = persons.length;
        const date = new Date();
        const formattedDate = date.toLocaleString('en-GB', { timeZone: 'Europe/Bucharest' });
        response.send(`<p>Phonebook has info for ${peopleNumber} people</p> <p>${formattedDate}</p>`);
    }).catch(error => {
        response.status(500).json({ error: 'Internal Server Error' });
    });
});

app.delete('/api/persons/:id', (request, response) => {
    const id = request.params.id;
    Person.findByIdAndDelete(id).then(() => {
        response.status(204).end();
    }).catch(error => {
        response.status(500).json({ error: 'Internal Server Error' });
    });
});

app.post('/api/persons', (request, response) => {
    const body = request.body;

    if (!body.name || !body.number) {
        return response.status(400).json({
            error: 'name or number missing'
        });
    }

    Person.findOne({ name: body.name }).then(existingPerson => {
        if (existingPerson) {
            return response.status(409).json({
                error: 'name must be unique'
            });
        }

        const person = new Person({
            name: body.name,
            number: body.number
        });

        person.save().then(savedPerson => {
            response.json(savedPerson);
        }).catch(error => {
            response.status(500).json({ error: 'Internal Server Error' });
        });
    }).catch(error => {
        response.status(500).json({ error: 'Internal Server Error' });
    });
});

const PORT = process.env.PORT
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})