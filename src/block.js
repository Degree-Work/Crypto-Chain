const {GENESIS_DATA, MINE_RATE} = require("./config");
const {cryptoHash} = require("./cryptoHash");
const hexToBinary = require('hex-to-binary');

class Block {
    constructor({timestamp, lastHash, hash, data, nonce, difficulty}) {
        this.timestamp = timestamp;
        this.lastHash = lastHash;
        this.hash = hash;
        this.data = data;
        this.nonce = nonce;
        this.difficulty = difficulty;
    }

    static genesisBlock() {
        return new this(GENESIS_DATA);
    }

    /**
     * Создание блока.
     * @param lastBlock - последний блок
     * @param data - данные
     * @returns {Block} - созданный новый блок
     */
    static mineBlock({lastBlock, data}) {
        let nonce = 0;
        let hash, timestamp;
        let difficulty = {lastBlock};
        const lastHash = lastBlock.hash;

        do {
            nonce++;
            timestamp = Date.now();
            difficulty = Block.adjustDifficulty({originalBlock: lastBlock, timestamp});
            hash = cryptoHash(timestamp, lastHash, data, nonce, difficulty);
        } while (hexToBinary(hash).substring(0, difficulty) !== '0'.repeat(difficulty));

        return new this({
            timestamp,
            lastHash,
            hash,
            data,
            nonce,
            difficulty
        });
    }

    /**
     * Регулировка сложности.
     *
     * @param originalBlock исходный блок
     * @param timestamp время создания нового блока
     * @returns новая сложность
     */
    static adjustDifficulty({originalBlock, timestamp}) {
        let {difficulty} = originalBlock;

        if ((timestamp - originalBlock.timestamp) > MINE_RATE) {
            difficulty--;
        } else {
            difficulty++;
        }

        if (difficulty < 1) {
            return 1;
        } else {
            return difficulty;
        }
    }
}

module.exports = {Block}