require('dotenv').config()

const express = require('express')
const app = express()
var morgan = require('morgan')
const cors = require('cors')
const Person = require('./models/person')

app.use(express.json())

morgan.token('body', req => JSON.stringify(req.body));

app.use(
  morgan(':method :url :status :res[content-length] - :response-time ms :body', {
    skip: req => req.method !== 'POST'
  })
);

app.use(cors())

app.use(express.static('dist'))

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

const PORT = process.env.PORT || 3001

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})

app.get('/api/persons', (request, response) => {
    Person.find({}).then(persons => {
    response.json(persons)
  })
})

//3.2: Phonebook backend step 2
app.get('/info', (request, response) => {
    const date = new Date();
    response.send(`<p>Phonebook has info for ${persons.length} people</p>${date}<p></p>`)
})

//3.3: Phonebook backend step 3
app.get('/api/persons/:id', (request, response) => {
  /* const id = request.params.id
  const person = persons.find(note => note.id === id)
    if (person) {    
        response.json(person)  } 
    else {    
        response.statusMessage = `Couldn't find a person having the id ${id}`
        response.status(404).end()  
    } */

    Person.findById(request.params.id).then(person => {
        response.json(person)
    })
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
  } 
  
  /* Person.find({ name: body.name }).then (exists =>{
    if (exists) {
        return response.status(400).json({ 
         error: `The name ${body.name} already exists in the phonebook. Names must be unique` 
         })
    }

  }) */
  
  const person = new Person ({
    name: body.name,
    number: body.number
  })

   person.save().then(savedPerson => {
    response.json(savedPerson)
  })
})
 