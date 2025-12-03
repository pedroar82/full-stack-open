const mongoose = require('mongoose')

if (process.argv.length < 3) {
  console.log('give password as argument')
  process.exit(1)
}

const password = process.argv[2]

const url = `mongodb+srv://pedroar:${password}@cluster0.ryey46y.mongodb.net/personApp?retryWrites=true&w=majority&appName=Cluster0`

mongoose.set('strictQuery',false)

mongoose.connect(url, { family: 4 })

const personSchema = new mongoose.Schema({
  name: String,
  number: String,
  id: Number
})

const Person = mongoose.model('Person', personSchema)

if (process.argv.length < 5) {
  console.log('person information is incomplete')
  process.exit(1)
} else {
  Person.find({})
    .then(persons => {
      const newId = persons.length + 1

      const person = new Person({
        name: process.argv[3],
        number: process.argv[4],
        id: newId,
      })
      return person.save()
    })
    .then(() => {
      console.log(`added ${process.argv[3]} number ${process.argv[4]} to phonebook`)
      return Person.find({})
    })
    .then(result => {
      result.forEach(person => {
        console.log(person)
      })
      mongoose.connection.close()
    })
    .catch(err => {
      console.error('Error:', err)
      mongoose.connection.close()
    })
}
