import config from '../config';
import { RequestHandler } from "express"
import {AxiosResponse} from 'axios';
import Summoner from './Summoner'
const axios = require('axios').default;

const apiUrl = 'https://euw1.api.riotgames.com/lol';
const apiToken = config.RIOT_API_KEY;
const apiHeaders = {
    'Accept-Language': "es-ES,es;q=0.9,en;q=0.8",
    'Content-Type': 'application/json; charset=UTF-8',
    'X-Riot-Token': apiToken
}

export const doRiotQuery: RequestHandler = async(req, res) => {
    res.json('Info refreshed');
    res.end();
}

export const addProfile: RequestHandler = async(req, res) => {
    let summId: String;
    let summName: String;

    axios.get(`${apiUrl}/summoner/v4/summoners/by-name/${encodeURIComponent(req.params.name)}`, {
        headers: apiHeaders
    }).then(function (response: AxiosResponse) {
        summId = response.data.id;
        summName = response.data.name;

        axios.get(`${apiUrl}/league/v4/entries/by-summoner/${response.data.id}`, {
            headers: apiHeaders
        }).then(async (sum: AxiosResponse) => {
            if (sum.data.length == 1) {
                const summFound = await Summoner.find({summonerId: sum.data['0'].id});
                if (summFound) {
                    res.status(301).json({message: 'The summoner already exists'});
                    res.end();
                }
                
                const newSummoner = {
                    "summonerId": sum.data['0'].summonerId,
                    "summonerName": sum.data['0'].summonerName,
                    "tier": sum.data['0'].tier,
                    "rank": sum.data['0'].rank,
                    "leaguePoints": sum.data['0'].leaguePoints,
                    "wins": sum.data['0'].wins,
                    "losses": sum.data['0'].losses,
                    "hotStreak": sum.data['0'].hotStreak
                }

                const pendingSummoner = new Summoner(newSummoner);
                const addedSummoner = await pendingSummoner.save();
                res.json(addedSummoner);
                res.end();
            } else {
                const newUnrankedSummoner = {
                    "summonerId": summId,
                    "summonerName": summName,
                    "tier": "UNRANKED",
                    "rank": "UNRANKED",
                    "leaguePoints": 0,
                    "wins": 0,
                    "losses": 0,
                    "hotStreak": false
                }

                const pendingSummoner = new Summoner(newUnrankedSummoner);
                const addedSummoner = await pendingSummoner.save();
                res.json(addedSummoner);
                res.end();   
            }
        })
    })
}

export const getSummoners: RequestHandler = async (req, res) => {
    const summoners = await Summoner.find();
    res.json(summoners);
    res.end();
}

export const getSummoner: RequestHandler = (req, res) => {
    res.json('getting summoner')
    res.end();
}

export const createSummoner: RequestHandler = async (req, res) => {
    const summFound = await Summoner.find({summonerId: req.body.summonerId});
    if (summFound) {
        res.status(301).json({message: 'The summoner already exists'});
        res.end();
    }
    
    const summoner = new Summoner(req.body);
    const savedSummoner = await summoner.save();
    res.json(savedSummoner);
    res.end();
}

export const deleteSummoner: RequestHandler = async (req, res) => {
    const summFound = await Summoner.find({summonerId: req.params.id});
    if(summFound) {
        const deletedSummoner = await Summoner.deleteOne({summonerId: req.params.id});
        res.json(deletedSummoner);
        res.end();
    } else {
        res.status(304).json({message: 'The summoner doesn´t exists'});
        res.end();
    }
}

export const updateSummoner: RequestHandler = async (req, res) => {
    const summFound = await Summoner.find({summonerId: req.params.id});
    if(summFound) {
        const updatedSummoner = await Summoner.updateOne({summonerId: req.params.id}, {
            summonerName: req.body.summonerName,
            tier: req.body.tier,
            rank: req.body.rank,
            leaguePoints: req.body.leaguePoints,
            wins: req.body.wins,
            losses: req.body.losses,
            hotStreak: req.body.hotStreak
        });
        res.json(updatedSummoner);
        res.end();
    } else {
        res.status(304).json({message: 'The summoner doesn´t exists'});
        res.end();
    }
}