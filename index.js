const express = require('express');
const {Blockchain} = require('./blockchain/blockchain');
const {PORT} = require('./config');

// Объект приложения
const app = express();

// Blockchain
const blockchain = new Blockchain();

app.get('/api/blocks', (req, res) => {
    res.json(blockchain.chain)
});

app.listen(PORT, () => {
    console.log(`listening at localhost: ${PORT}`);
})