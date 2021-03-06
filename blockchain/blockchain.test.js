const {Blockchain} = require("./blockchain");
const {Block} = require("./block");
const {cryptoHash} = require("../util/cryptoHash");
const hexToBinary = require('hex-to-binary');

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

            describe('and the chain contains a block with a jumped difficulty', () => {
                it('returns false', () => {
                    const lastBlock = blockchain.chain[blockchain.getLength() - 1];
                    const lastHash = lastBlock.hash;
                    const timestamp = Date.now();
                    const nonce = 0;
                    const data = [];
                    const difficulty = lastBlock.difficulty - 3;

                    const hash = cryptoHash(timestamp, lastHash, difficulty, nonce, data);

                    const badBlock = new Block({
                        timestamp,
                        lastHash,
                        hash,
                        data,
                        nonce,
                        difficulty
                    });

                    blockchain.chain.push(badBlock);

                    expect(Blockchain.isValidChain(blockchain.chain)).toBe(false);
                })
            });
        });
    });

    describe('replaceChain()', () => {
        let errorMock, logMock;

        beforeEach(() => {
            errorMock = jest.fn();
            logMock = jest.fn();

            global.console.error = errorMock;
            global.console.log = logMock;
        });

        describe('when the new chain is not longer', () => {
            beforeEach(() => {
                newBlockchain.chain[0] = {new: 'chain'};
                blockchain.replaceChain(newBlockchain.chain);
            });

            it('does bot replace the chain', () => {
                expect(blockchain.chain).toEqual(originalChain);
            })

            it('logs an error', () => {
                expect(errorMock).toHaveBeenCalled();
            });
        });

        describe('when the new chain is longer', () => {

            beforeEach(() => {
                newBlockchain.addBlock({data: 'Bears'});
                newBlockchain.addBlock({data: 'Cats'});
                newBlockchain.addBlock({data: 'Dogs'});
            });

            describe('and the chain is invalid', () => {
                beforeEach(() => {
                    newBlockchain.chain[2].hash = 'some-fake-hash';
                    blockchain.replaceChain(newBlockchain.chain);
                });

                it('does not replace the chain', () => {
                    expect(blockchain.chain).toEqual(originalChain);
                })

                it('logs an error', () => {
                    expect(errorMock).toHaveBeenCalled();
                });
            });

            describe('and the chain is valid', () => {
                beforeEach(() => {
                    blockchain.replaceChain(newBlockchain.chain);
                });

                it('replaces the chain', () => {
                    blockchain.replaceChain(newBlockchain.chain);
                    expect(blockchain.chain).toEqual(newBlockchain.chain);
                })

                it('logs an log', () => {
                    expect(logMock).toHaveBeenCalled();
                });
            });
        });
    });
});