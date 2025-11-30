import { useState, useEffect } from 'react'
import personService from './services/persons'
import PersonForm from './components/PersonForm'
import Filter from './components/Filter'
import Persons from './components/Persons'
import Notification from './components/Notification'
import './index.css'

const App = () => {

  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '', id: '1' }
  ])

  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [newSearch, setNewSearch] = useState('')
  const [errorMessage, setErrorMessage] = useState(null)

  useEffect(() => {
    personService
      .getAll()
      .then(intialPersons => {
        setPersons(intialPersons)
      })
  }, [])

  const addName = (event) => {
    const personAdd = persons.find(name => name.name === newName)
    if (personAdd) {
      if (confirm(`${newName} is already added to phonebook, replace the old number with a new one?`)) {
        const updObject = {
          ...personAdd, number: newNumber
        }
        personService
          .update(personAdd.id, updObject)
          .then(updatedPerson => {
            setPersons(persons.map(person => person.id === personAdd.id ? updatedPerson : person))
          })
          .catch(error => { alert(`Update error: ${error.message}`) })
      }

    } else {
      const newPerson = {
        name: newName,
        number: newNumber
      }
      personService
        .create(newPerson)
        .then(returnedPerson => {
          setPersons(persons.concat(returnedPerson))
          setErrorMessage(`Added ${returnedPerson.name}`)
          setTimeout(() => {
            setErrorMessage(null)
          }, 5000)
          setNewName('')
          setNewNumber('')
        })
    }
    event.preventDefault()
  }

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }

  const handleSearchChange = (event) => {
    setNewSearch(event.target.value)
  }

  const deletePerson = (id, name) => {
    if (confirm(`Delete ${name}?`)) {
      personService
        .deletePersonService(id)
        .then(returnResult => {
          setPersons(persons.filter(person => person.id !== returnResult.id))
        })
        .catch(error => { alert(`Delete error: ${error.message}`) })
    }
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={errorMessage} />
      <Filter newSearch={newSearch}
        handleSearchChange={handleSearchChange} />
      <h2>add a new</h2>
      <PersonForm addName={addName}
        handleNameChange={handleNameChange}
        newName={newName}
        newNumber={newNumber}
        handleNumberChange={handleNumberChange} />
      <h2>Numbers</h2>
      <Persons persons={persons}
        newSearch={newSearch}
        deletePerson={deletePerson} />
    </div >
  )
}

export default App