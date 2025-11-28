import { useState } from 'react'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', id: '1' }
  ])
  const [newName, setNewName] = useState('')

  const addName = (event) => {
    if (persons.find(name => name.name === newName)) {
      alert(`${newName} is already added to phonebook`)
    } else {
      setPersons([...persons,
      {
        name: newName,
        id: String(persons.length + 1)
      }])
      setNewName('')
    }
    event.preventDefault()
  }

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={addName}>
        <div>
          name: <input value={newName}
            onChange={handleNameChange} />
        </div>
        <div>
          <button type="submit" >add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      {persons.map(name =>
        <p key={name.id} style={{ margin: 0 }}>{name.name}</p>
      )}
    </div >
  )
}

export default App