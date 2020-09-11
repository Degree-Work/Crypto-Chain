const {GENESIS_DATA} = require("./config");
const {cryptoHash} = require("./cryptoHash");

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
        const lastHash = lastBlock.hash;
        const difficulty = {lastBlock};

        const preFix = '0'.repeat(difficulty);
        do {
            nonce++;
            timestamp = Date.now();
            hash = cryptoHash(timestamp, lastHash, data, nonce, difficulty);
        } while (hash.substring(0, difficulty) !== preFix);

        return new this({
            timestamp,
            lastHash,
            hash,
            data,
            nonce,
            difficulty
        });
    }
}

module.exports = {Block}