import React, { useState, useEffect } from 'react';
import Filter from './components/Filter';
import PersonForm from './components/PersonForm';
import Persons from './components/Persons';
import axios from 'axios';
import phonebookService from './services/phonebook';
import Notification from './components/Notification';
import Error from './components/Error';

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState('');
  const [newNumber, setNewNumber] = useState('');
  const [filter, setFilter] = useState('');
  const [successNotification, setSuccessNotification] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);

  useEffect(() => {
    axios.get('http://fullstackopen-k6l1.onrender.com/api/persons').then((response) => {
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

  const showNotification = (message) => {
    setSuccessNotification(message);
    setTimeout(() => {
      setSuccessNotification(null);
    }, 3000);
  };

  const showError = (message) => {
    setErrorMessage(message);
    setTimeout(() => {
      setErrorMessage(null);
    }, 5000);
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
            showNotification(`Updated ${newName}`);
          })
          .catch(error => {
            console.error('Error updating entry:', error);
            showError('Error updating entry');
          });
      }
    } else {
      phonebookService.create(newPerson)
        .then(returnedEntry => {
          setPersons(persons.concat(returnedEntry));
          setNewName('');
          setNewNumber('');
          showNotification(`Added ${newName}`);
        })
        .catch(error => {
          console.error('Error creating entry:', error);
          showError('Error creating entry');
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
          showError(`Information of ${name} has already been removed from server`);
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
      <Error error={errorMessage} />
      <Notification message={successNotification} />
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