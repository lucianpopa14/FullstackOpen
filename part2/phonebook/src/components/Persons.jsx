import React from 'react'

const Persons = ({ filteredPersons, deleteEntry }) => {
  return (
    <ul>
      {filteredPersons.map(person => (
        <li key={person.id}>
          {person.name} {person.number}
          <button onClick={() => deleteEntry(person.id, person.name)}>delete</button>
        </li>
      ))}
    </ul>
  )
}

export default Persons