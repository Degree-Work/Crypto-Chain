const {Block} = require("./block");
const {cryptoHash} = require("./cryptoHash");

class Blockchain {
    constructor() {
        this.chain = [Block.genesisBlock()];
    }

    addBlock({data}) {
        const newBlock = Block.mineBlock({
            lastBlock: this.chain[this.getLength() - 1],
            data
        });

        this.chain.push(newBlock);
    }

    getLength() {
        return this.chain.length;
    }

    static isValidChain(chain) {
        if (JSON.stringify(chain[0]) !== JSON.stringify(Block.genesisBlock())) {
            return false;
        }

        for (let i = 1; i < chain.length; i++) {
            const block = chain[i];
            const actualLastHash = chain[i - 1].hash;
            const {timestamp, lastHash, hash, data, nonce, difficulty} = block;

            if (actualLastHash !== lastHash) {
                return false;
            }

            const validHash = cryptoHash(timestamp, lastHash, data, nonce, difficulty);
            if (validHash !== hash) {
                return false;
            }
        }
        return true;
    }

    replaceChain(chain) {
        if (chain.length <= this.getLength()) {
            console.error('The incoming chain must be longer');
            return;
        }

        if (!Blockchain.isValidChain(chain)) {
            console.error('The incoming chain must be valid');
            return;
        }

        console.log('replacing chain with', chain);
        this.chain = chain;
    }
}

module.exports = {Blockchain}