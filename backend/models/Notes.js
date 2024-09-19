const mongoose = require('mongoose');
const {Schema} = mongoose;

const NotesSchema = new Schema({
    user:{
        // Relationship between Notes_id with user_id
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user'
    },
    title:{
        type: String,
        required: true
    },
    description:{
        type: String,
        required: true,
        unique: true
    },
    tag:{
        type: String,
        default:"General"
    },
    date:{
        type: Date,
        default: Date.now
    }
})

module.exports = mongoose.model('notes', NotesSchema);