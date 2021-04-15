const mongoose = require('mongoose')

// POISTA SALASANA ENNEN TEHTÄVÄN PALAUTUSTA!!!
const url = 'mongodb+srv://HankTheMachine:<PASSWORD>@hkreminderfullstackdb.jbnwk.mongodb.net/reminderapp-reminders'
mongoose.connect(url, {useNewUrlParser: true, useUnifiedTopology: true})
const reminderSchema = new mongoose.Schema({
    text: String,
    date: Date,
    timestamp: Date,
})
const Reminder = mongoose.model('Reminder',reminderSchema)


var args = process.argv
if (args[2] !== undefined || args[3] !== undefined){
    var texttopass = (args[2])
    var datetopass = (args[3])
} else {
    console.log("Missing arguments. Call function in form 'node mongo.js <'Reminder in quotations'> <Date>'")
    return; // tähän täytyy olla parempi keino
}



const reminder = new Reminder({text: texttopass, date: new Date(datetopass), timestamp: new Date(),})

reminder
  .save()
  .then(response => {
    console.log('reminder saved')
    mongoose.connection.close()
})
