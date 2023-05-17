import mongoose from 'mongoose';

const wysiwygSchema = new mongoose.Schema({
    wysiwyg: {
        type: String,
        required: true
    }
}, {
    timestamps: true
})

let Dataset = mongoose.models.user || mongoose.model('wysiwygModel', wysiwygSchema)
export default Dataset
