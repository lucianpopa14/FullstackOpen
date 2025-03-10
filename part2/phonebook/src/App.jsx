/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';
import Filter from './components/Filter';
import PersonForm from './components/PersonForm';
import Persons from './components/Persons';
import axios from 'axios';
import phonebookService from './services/phonebook';

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState('');
  const [newNumber, setNewNumber] = useState('');
  const [filter, setFilter] = useState('');

  useEffect(() => {
    axios.get('http://localhost:3001/persons').then((response) => {
      console.log('promise fulfilled');
      setPersons(response.data);
    });
  }, []);

  const handleNameChange = (event) => {
    setNewName(event.target.value);
  };

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value);
  };

  const handleFilterChange = (event) => {
    setFilter(event.target.value);
  };

  const addEntry = (event) => {
    event.preventDefault();
    const newPerson = {
      name: newName,
      number: newNumber,
    };

    const existingPerson = persons.find(person => person.name === newName);

    if (existingPerson) {
      const confirmUpdate = window.confirm(
        `${newName} is already added to phonebook, replace the old number with a new one?`
      );
      if (confirmUpdate) {
        phonebookService.update(existingPerson.id, newPerson)
          .then(returnedEntry => {
            setPersons(persons.map(person =>
              person.id !== existingPerson.id ? person : returnedEntry
            ));
            setNewName('');
            setNewNumber('');
          })
          .catch(error => {
            console.error('Error updating entry:', error);
          });
      }
    } else {
      phonebookService.create(newPerson)
        .then(returnedEntry => {
          setPersons(persons.concat(returnedEntry));
          setNewName('');
          setNewNumber('');
        })
        .catch(error => {
          console.error('Error creating entry:', error);
        });
    }
  };

  const deleteEntry = (idToDelete, name) => {
    const confirmDelete = window.confirm(`Delete ${name} ?`);
    if (confirmDelete) {
      phonebookService.deleteEntry(idToDelete)
        .then(() => {
          setPersons(persons.filter(person => person.id !== idToDelete));
          console.log(`${name} has been deleted`);
        })
        .catch((error) => {
          console.error('Error deleting entry:', error);
        });
    }
  }

  const filteredPersons = persons.filter(person =>
    person.name.toLowerCase().includes(filter.toLowerCase())
  );

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter filter={filter} handleFilterChange={handleFilterChange} />
      <h3>Add a new</h3>
      <PersonForm
        addEntry={addEntry}
        newName={newName}
        handleNameChange={handleNameChange}
        newNumber={newNumber}
        handleNumberChange={handleNumberChange}
      />
      <h3>Numbers</h3>
      <Persons filteredPersons={filteredPersons} deleteEntry={deleteEntry} />
    </div>
  );
};

export default App;
