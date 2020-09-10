const {Blockchain} = require("../blockchain");
const {Block} = require("../block");

describe('Blockchain', () => {
    let blockchain, newBlockchain, originalChain;

    beforeEach(() => {
        blockchain = new Blockchain();
        newBlockchain = new Blockchain();

        originalChain = blockchain.chain;
    });

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

    describe('isValidChain()', () => {

        beforeEach(() => {
            blockchain.addBlock({data: 'Bears'});
            blockchain.addBlock({data: 'Cats'});
            blockchain.addBlock({data: 'Dogs'});
        });

        describe('when the chain does not start with the genesis block', () => {
            it('returns false', () => {
                blockchain.chain[0] = {data: 'fake-genesis'};
                expect(Blockchain.isValidChain(blockchain.chain)).toBe(false);
            })
        });

        describe('when the chain starts with the genesis block and has multiple blocks', () => {
            describe('and a lastHash reference has changed', () => {
                it('returns false', () => {
                    blockchain.chain[2].lastHash = 'broken-last';

                    expect(Blockchain.isValidChain(blockchain.chain)).toBe(false);
                })
            });

            describe('and the chain contains a block with an invalid field', () => {
                it('returns false', () => {
                    blockchain.chain[2].data = 'bad-data';

                    expect(Blockchain.isValidChain(blockchain.chain)).toBe(false);
                })
            });

            describe('and the chain does not contain any invalid blocks', () => {
                it('returns true', () => {
                    expect(Blockchain.isValidChain(blockchain.chain)).toBe(true);
                })
            });
        });
    });

    describe('replaceChain()', () => {
        describe('when the new chain is not longer', () => {
            it('does bot replace the chain', () => {
                newBlockchain.chain[0] = {new: 'chain'};
                blockchain.replaceChain(newBlockchain.chain);
                expect(blockchain.chain).toEqual(originalChain);
            })
        });

        describe('when the new chain is longer', () => {

            beforeEach(() => {
                newBlockchain.addBlock({data: 'Bears'});
                newBlockchain.addBlock({data: 'Cats'});
                newBlockchain.addBlock({data: 'Dogs'});
            });

            describe('and the chain is invalid', () => {
                it('does not replace the chain', () => {
                    newBlockchain.chain[2].hash = 'some-fake-hash';
                    blockchain.replaceChain(newBlockchain.chain);
                    expect(blockchain.chain).toEqual(originalChain);
                })
            });

            describe('and the chain is valid', () => {
                it('replaces the chain', () => {
                    blockchain.replaceChain(newBlockchain.chain);
                    expect(blockchain.chain).toEqual(newBlockchain.chain);
                })
            });
        });
    });
});