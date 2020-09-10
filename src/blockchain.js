const {Block} = require("./block");

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
}

module.exports = {Blockchain}