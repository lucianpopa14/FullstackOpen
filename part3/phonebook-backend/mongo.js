const mongoose = require('mongoose');

if (process.argv.length < 3) {
    console.log('Give password as argument');
    process.exit(1);
}

const password = process.argv[2];
const url = `mongodb+srv://lucianpopa98:${password}@cluster0.3u6oug7.mongodb.net/phonebookApp?retryWrites=true&w=majority&appName=Cluster0`;

mongoose.set('strictQuery', false);
mongoose.connect(url);

const personSchema = new mongoose.Schema({
    name: String,
    number: String,
});

const Person = mongoose.model('Person', personSchema);

if (process.argv.length === 3) {
    Person.find({}).then(result => {
        console.log('Phonebook entries:');
        result.forEach(person => {
            console.log(`${person.name} ${person.number}`);
        });
        mongoose.connection.close();
    });
} else {
    const person = new Person({
        name: process.argv[3],
        number: process.argv[4],
    });

    person.save().then(result => {
        console.log(`added ${person.name} number ${person.number} to the phonebook`);
        mongoose.connection.close();
    });
}
