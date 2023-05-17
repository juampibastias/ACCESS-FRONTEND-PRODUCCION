import mongoose from 'mongoose'

const numSegSchema = new mongoose.Schema({
    numSeg: {
        type: String,
        required: true
    }
}, {
    timestamps: true
})

let Dataset = mongoose.models.user || mongoose.model('numeroSeguimiento', numSegSchema)
export default Dataset