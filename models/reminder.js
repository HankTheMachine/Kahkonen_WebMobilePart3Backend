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
module.exports = Reminder