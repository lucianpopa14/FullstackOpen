const express = require('express');
const app = express();
const morgan = require('morgan');
const cors = require('cors');
const Person = require('./models/person');
require('dotenv').config();

app.use(express.json());
app.use(morgan('tiny'));
app.use(cors());
app.use(express.static('dist'));

app.get('/api/persons', (request, response, next) => {
    Person.find({}).then(persons => {
        response.json(persons);
    }).catch(error => next(error));
});

app.get('/api/persons/:id', (request, response, next) => {
    const id = request.params.id;
    Person.findById(id).then(person => {
        if (person) {
            response.json(person);
        } else {
            response.status(404).end();
        }
    }).catch(error => next(error));
});

app.get('/info', (request, response, next) => {
    Person.find({}).then(persons => {
        const peopleNumber = persons.length;
        const date = new Date();
        const formattedDate = date.toLocaleString('en-GB', { timeZone: 'Europe/Bucharest' });
        response.send(`<p>Phonebook has info for ${peopleNumber} people</p> <p>${formattedDate}</p>`);
    }).catch(error => next(error));
});

app.delete('/api/persons/:id', (request, response, next) => {
    const id = request.params.id;
    Person.findByIdAndDelete(id).then(() => {
        response.status(204).end();
    }).catch(error => next(error));
});

app.post('/api/persons', (request, response, next) => {
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
        }).catch(error => next(error));
    }).catch(error => next(error));
});

app.put('/api/persons/:id', (request, response, next) => {
    const id = request.params.id;
    const body = request.body;

    if (!body.number) {
        return response.status(400).json({
            error: 'number missing'
        });
    }

    Person.findByIdAndUpdate(id, { number: body.number }, { new: true, runValidators: true })
        .then(updatedPerson => {
            if (updatedPerson) {
                response.json(updatedPerson);
            } else {
                response.status(404).json({ error: 'Person not found' });
            }
        })
        .catch(error => next(error));
});

const errorHandler = (error, request, response, next) => {
    console.error(error.message);

    if (error.name === 'CastError') {
        return response.status(400).send({ error: 'malformatted id' });
    }

    response.status(500).json({ error: 'Internal Server Error' });
};

app.use(errorHandler);

const PORT = process.env.PORT;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});