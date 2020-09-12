const express = require('express');
const {Blockchain} = require('./blockchain/blockchain');
const {PORT} = require('./config');
const bodyParser = require('body-parser');

// Объект приложения
const app = express();

// Blockchain
const blockchain = new Blockchain();

app.use(bodyParser.json());

app.listen(PORT, () => {
    console.log(`listening at localhost: ${PORT}`);
});

// Получение всех блоков
app.get('/api/blocks', (req, res) => {
    res.json(blockchain.chain)
});

// Создание нового блока
app.post('/api/mine', (req, res) => {
    const {data} = req.body;

    blockchain.addBlock({data})

    res.redirect('/api/blocks');
});