const express = require('express')
const app = express()
const cors = require('cors')
app.use(express.static('build'))
const { stringify } = require('querystring')
const bodyParser = require('body-parser')
app.use(bodyParser.json())
app.use(cors())
const Reminder = require('./models/reminder')
const mongoose = require('mongoose')

const formatReminder = (reminder) => {
    const formattedReminder = { ...reminder._doc, id: reminder._id }
    delete formattedReminder._id
    delete formattedReminder.__v

    return formattedReminder
}

/*
const generateId = () => {
    //parempi id -generointi materiaaleista:
    //const maxId = notes.length > 0 ? notes.map(n => n.id).sort((a,b) => a - b).reverse()[0] : 1
    //return maxId + 1
    
   return Math.floor(Math.random()*1000000)
}
*/

let reminders = [
    /*
    {
        text: "Testireminder",
        date: "2021-04-13T08:59:09.850Z",
        timestamp: "2021-04-13T08:59:09.850Z"
    }
    */

]

app.get('/api', (req, res) => {
  res.send('<h1>Sivu jota etsit ei taida olla täällä</h1>')
})

app.get('/api/reminders', (request, response) => {
    Reminder
      .find({})
      .then(reminders => {
        console.log('reminders fetched')
        response.json(reminders.map(formatReminder))
      })   
})

app.get('/api/reminders/:id', (request, response) => {
    
    /*const id = Number(request.params.id)
    const reminder = reminders.find(reminder => reminder.id === id)
    if (reminder) {
        response.json(reminder)
    } else {
        console.log("GET call failed: id "+id+" not found")
        response.status(404).end()
    }
    */
   const id = request.params.id
   Reminder
    .find( {_id: id} )
    .then(reminder => {
        response.json(reminder.map(formatReminder))
    })
})

// päivitä mongon syntaksiin
app.delete('/api/reminders/:id', (request, response) => {
    const id = request.params.id
    console.log("DELETE call made to reminder id "+id)
    Reminder
        .deleteOne( {_id: id } )
        .then(response => {
            console.log("Reminder deleted")
        })
    reminders = reminders.filter(reminder => reminder.id !== id)
  
    response.status(204).end()
})


app.post('/api/reminders/', (request, response) => {
    const body = request.body

    if (body.text === undefined) {
        console.log("POST call failed, nonexistent reminder content")
        return response.status(400).json({error: "Can't read reminder content"})
      }
    if (body.date === undefined) {
        console.log("POST call failed, missing date")
        return response.status(400).json({error: "Missing date"})
    }
    const texts = reminders.map(reminder => reminder.text)
    if (texts.includes(body.text)) {
            console.log("POST call failed, nonunique reminder")
            return response.status(400).json({error: "Reminder content must be unique"})
        }          
    const reminder = new Reminder({text: body.text, date: new Date(body.date), timestamp: new Date()})

    reminder
      .save()
      .then(response => {
        console.log('reminder saved')
    })
    
    /*
    reminders = reminders.concat(reminder)
    console.log("POST call received to add reminder. Reminder data:")
    console.log(reminder)
    response.json(reminder)
    */

    /*
    const reminder = {
        text: body.text,
        date: new Date(body.date),
        timestamp: new Date(),
        id: generateId()
    }
  
    reminders = reminders.concat(reminder)
    console.log("POST call received to add reminder. Reminder data:")
    console.log(reminder)
    response.json(reminder)
    */
})

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`Serveri käynnissä portissa ${PORT}`)
})