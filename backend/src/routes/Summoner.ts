import {Schema, model} from 'mongoose';

const summonerSchema = new Schema({
    summonerId: {
        type: String,
        required: true,
        trim: true,
        unique: true
    },
    summonerName: {
        type: String,
        required: true
    },
    tier: {
        type: String,
        required: true
    },
    rank: {
        type: String,
        required: true
    },
    leaguePoints: {
        type: Number,
        required: true
    },
    wins: {
        type: Number,
        required: true
    },
    losses: {
        type: Number,
        required: true
    },
    hotStreak: {
        type: Boolean,
        required: true
    },
    winRate: {
        type: Number,
        required: false
    },
    level: {
        type: Number,
        required: false
    }
}, {
    versionKey: false,
    timestamps: true
})

export default model('Summoner', summonerSchema);