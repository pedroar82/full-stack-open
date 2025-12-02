const express = require('express')
const app = express()

app.use(express.json())

let  persons = 
    [
        { 
        "id": "1",
        "name": "Arto Hellas", 
        "number": "040-123456"
        },
        { 
        "id": "2",
        "name": "Ada Lovelace", 
        "number": "39-44-5323523"
        },
        { 
        "id": "3",
        "name": "Dan Abramov", 
        "number": "12-43-234345"
        },
        { 
        "id": "4",
        "name": "Mary Poppendieck", 
        "number": "39-23-6423122"
        }
    ]

const PORT = 3001

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})

app.get('/api/persons', (request, response) => {
  response.json(persons)
})

//3.2: Phonebook backend step 2
app.get('/info', (request, response) => {
    const date = new Date();
    response.send(`<p>Phonebook has info for ${persons.length} people</p>${date}<p></p>`)
})

//3.3: Phonebook backend step 3
app.get('/api/persons/:id', (request, response) => {
  const id = request.params.id
  const person = persons.find(note => note.id === id)
    if (person) {    
        response.json(person)  } 
    else {    
        response.statusMessage = `Couldn't find a person having the id ${id}`
        response.status(404).end()  
    }
})

//3.4: Phonebook backend step 4
app.delete('/api/persons/:id', (request, response) => {
  const id = request.params.id
  persons = persons.filter(person => person.id !== id)

  response.status(204).end()
})

//3.5: Phonebook backend step 5
const generateId = () => {
  const maxId = persons.length > 0
    ? Math.max(...persons.map(n => Number(n.id)))
    : 0
  return String(maxId + 1)
}

app.post('/api/persons', (request, response) => {
  const body = request.body

  //3.6: Phonebook backend step 6
  if (!body.name || !body.number ) {
    return response.status(400).json({ 
      error: 'Incomplete person entry, the name or number is missing' 
    })
  } else if (persons.filter(person=> {person.name === body.name})){
     return response.status(400).json({ 
      error: `The name ${body.name} already exists in the phonebook. Names must be unique` 
    })
  }

  const person = {
    name: body.name,
    number: body.number,
    id: generateId()
  }

  persons = persons.concat(person)

  response.json(person)
})
 