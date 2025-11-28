import { useState } from 'react'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '', id: '1' }
  ])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [newSearch, setNewSearch] = useState('')


  const addName = (event) => {
    if (persons.find(name => name.name === newName)) {
      alert(`${newName} is already added to phonebook`)
    } else {
      setPersons([...persons,
      {
        name: newName,
        number: newNumber,
        id: String(persons.length + 1)
      }])
      setNewName('')
      setNewNumber('')
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

  return (
    <div>
      <h2>Phonebook</h2>
      <div>
        filter shown with: <input value={newSearch}
          onChange={handleSearchChange} />
      </div>
      <h2>add a new</h2>
      <form onSubmit={addName}>
        <div>
          name: <input value={newName}
            onChange={handleNameChange} />
        </div>
        <div>number: <input value={newNumber}
          onChange={handleNumberChange} /></div>
        <div>
          <button type="submit" >add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      {persons.filter(name =>
        (newSearch) === '' ? true : name.name.toLowerCase().indexOf(newSearch.toLowerCase()) >= 0)
        .map(name =>
          <p key={name.id} style={{ margin: 0 }}>{name.name} {name.number}</p>
        )}
    </div >
  )
}

export default App