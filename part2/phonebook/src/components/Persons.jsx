import React from 'react'

const Persons = ({ filteredPersons }) => {
  return (
    <ul>
      {filteredPersons.map(person => (
        <li key={person.id}>
          {person.name} {person.number}
        </li>
      ))}
    </ul>
  )
}

export default Persons