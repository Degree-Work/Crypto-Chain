const {Blockchain} = require("../blockchain");
const {Block} = require("../block");

describe('Blockchain', () => {
    const blockchain = new Blockchain();

    it('contains a `chain` Array instance', () => {
        expect(blockchain.chain instanceof Array).toBe(true);
    })

    it('start with a genesis block', () => {
        expect(blockchain.chain[0])
            .toEqual(Block.genesisBlock());
    })

    it('add a new block to the chain', () => {
        const newData = 'foo-bar';

        blockchain.addBlock({
            data: newData
        });

        expect(blockchain.chain[blockchain.chain.length - 1].data)
            .toEqual(newData);
    })
});