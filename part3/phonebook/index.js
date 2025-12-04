require('dotenv').config()

const express = require('express')
const app = express()
var morgan = require('morgan')
const cors = require('cors')
const Person = require('./models/person')

const requestLogger = (request, response, next) => {
  console.log('Method:', request.method)
  console.log('Path:  ', request.path)
  console.log('Body:  ', request.body)
  console.log('---')
  next()
}


app.use(express.json())
morgan.token('body', req => JSON.stringify(req.body));
app.use(
  morgan(':method :url :status :res[content-length] - :response-time ms :body', {
    skip: req => req.method !== 'POST'
  })
);
app.use(cors())
app.use(express.static('dist'))
app.use(requestLogger)

app.get('/api/persons', (request, response) => {
    Person.find({}).then(persons => {
    response.json(persons)
  })
})


app.get('/info', (request, response) => {
    const date = new Date();
    Person.find({}).then(persons => {
      response.send(`<p>Phonebook has info for ${persons.length} people</p>${date}<p></p>`)
  })
    
})

app.get('/api/persons/:id', (request, response, next) => {
    Person.findById(request.params.id).then(person => {
        if (person){
            response.json(person)
         } else {       
             response.status(404).end()  
        }
    }).catch(error => next(error))
})


//3.15: Phonebook database, step 3
app.delete('/api/persons/:id', (request, response, next) => {
  Person.findByIdAndDelete(request.params.id)
    .then(result => {
      response.status(204).end()
    })
    .catch(error => next(error))
})

app.post('/api/persons', (request, response) => {
  const body = request.body
console.log('body', body)
  //3.6: Phonebook backend step 6
  if (!body.name || !body.number ) {
    return response.status(400).json({  
      error: 'Incomplete person entry, the name or number is missing' 
    })
  } 
  
   Person.find({ name: body.name }).then (exists =>{
    if (exists) {
        return response.status(400).json({ 
         error: `The name ${body.name} already exists in the phonebook. Names must be unique` 
         })
    }

  }) 
  
  const person = new Person ({
    name: body.name,
    number: body.number
  })

   person.save().then(savedPerson => {
    response.json(savedPerson)
  })
})

//3.17*: Phonebook database, step 5
app.put('/api/persons/:id', (request, response, next) => {
  const { name, number } = request.body

  Person.findById(request.params.id)
    .then((person) => {
      if (!person) {
        return response.status(404).end()
      }

      person.name = name
      person.number = number

      return person.save().then((updatedPerson) => {
        response.json(updatedPerson)
      })
    })
    .catch((error) => next(error))
})
 
//Error Handlers
const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: 'unknown endpoint' })
}

const errorHandler = (error, request, response, next) => {
  console.error(error.message)

  if (error.name === 'CastError') {
    return response.status(400).send({ error: 'malformatted id' })
  }

  next(error)
}

app.use(unknownEndpoint)
app.use(errorHandler)

const PORT = process.env.PORT || 3001

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
