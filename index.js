// index.js
 
const serverless = require('serverless-http');
const bodyParser = require('body-parser');
const express = require('express')
const app = express()
const AWS = require('aws-sdk');
const d20 = require('d20');
 
const USERS_TABLE = process.env.USERS_TABLE;
const POKEMON_TABLE = process.env.POKEMON_TABLE;
 
const IS_OFFLINE = process.env.IS_OFFLINE;
let dynamoDb;
if (IS_OFFLINE === 'true') {
  dynamoDb = new AWS.DynamoDB.DocumentClient({
    region: 'localhost',
    endpoint: 'http://localhost:8000'
  })
  console.log(dynamoDb);
} else {
  dynamoDb = new AWS.DynamoDB.DocumentClient();
};
 
app.use(bodyParser.json({ strict: false }));
 
app.get('/', function (req, res) {
  res.send("Welcome to Mark Rattle's serverless deployment!")
})
 
// Get User endpoint
app.get('/users/:userId', function (req, res) {
  const params = {
    TableName: USERS_TABLE,
    Key: {
      userId: req.params.userId,
    },
  }
 
  dynamoDb.get(params, (error, result) => {
    if (error) {
      console.log(error);
      res.status(400).json({ error: 'Could not get user' });
    }
    if (result.Item) {
      const {userId, name} = result.Item;
      res.json({ userId, name });
    } else {
      res.status(404).json({ error: "User not found" });
    }
  });
})

// Get Pokemon endpoint
app.get('/pokemon/:pokemonName', function (req, res) {
  const params = {
    TableName: POKEMON_TABLE,
    Key: {
      pokemonName: req.params.pokemonName,
    },
  }
 
  dynamoDb.get(params, (error, result) => {
    if (error) {
      console.log(error);
      res.status(400).json({ error: 'Could not get pokemon' });
    }
    if (result.Item) {
      const {pokemonName, pokemonType} = result.Item;
      res.json({ pokemonName, pokemonType });
    } else {
      res.status(404).json({ error: "Pokemon not found" });
    }
  });
})

app.get('/roll', function (req, res) {
  res.send(`You throw your d20 and roll a ${d20.roll(20)}!`)
})
 
// Create User endpoint
app.post('/users', function (req, res) {
  const { userId, name } = req.body;
  if (typeof userId !== 'string') {
    res.status(400).json({ error: '"userId" must be a string' });
  } else if (typeof name !== 'string') {
    res.status(400).json({ error: '"name" must be a string' });
  }
 
  const params = {
    TableName: USERS_TABLE,
    Item: {
      userId: userId,
      name: name,
    },
  };
 
  dynamoDb.put(params, (error) => {
    if (error) {
      console.log(error);
      res.status(400).json({ error: 'Could not create user' });
    }
    res.json({ userId, name });
  });
})

// Create Pokemon endpoint
app.post('/pokemon', function (req, res) {
  const typesList = [
    "normal",
    "fire",
    "water",
    "grass",
    "electric",
    "ice",
    "fighting",
    "poison",
    "ground",
    "flying",
    "psychic",
    "bug",
    "rock",
    "ghost",
    "dark",
    "dragon",
    "steel",
    "fairy"
  ]

  const { pokemonName, pokemonType } = req.body;
  if (typeof pokemonName !== 'string') {
    res.status(400).json({ error: '"pokemonName" must be a string' });
  } else if (!typesList.includes((pokemonType))) {
    res.status(400).json({ 
      error: `"pokemonType" was ${pokemonType} but must be one of: ${typesList}`,
      "req.body": req.body });
  }
 
  const params = {
    TableName: POKEMON_TABLE,
    Item: {
      pokemonName: pokemonName,
      pokemonType: pokemonType,
    },
  };
 
  dynamoDb.put(params, (error) => {
    if (error) {
      console.log(error);
      res.status(400).json({ error: 'Could not create pokemon' });
    }
    res.json({ pokemonName, pokemonType });
  });
})
 
module.exports.handler = serverless(app);