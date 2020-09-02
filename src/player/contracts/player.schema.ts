import * as mongoose from 'mongoose'

export const playerSchema = new mongoose.Schema({
    phoneNumber: {
        type: String,
        unique: true
    },
    email: {
        type: String,
        unique: true
    },
    name: {
        type: String,
        unique: false
    },
    ranking: {
        type: String
    },
    posRanking: {
        type: Number,
    },
    urlPhoto: {
        type: String
    },
}, { timestamps: true, collection: 'players' });