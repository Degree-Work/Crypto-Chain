const {GENESIS_DATA, MINE_RATE} = require("../config");
const {Block} = require("./block");
const {cryptoHash} = require("../util/cryptoHash");
const hexToBinary = require('hex-to-binary');

describe('Block', () => {
    const timestamp = 1000;
    const lastHash = 'foo-hash';
    const hash = 'bar-hash';
    const data = ['blockchain', 'data'];
    const nonce = 1;
    const difficulty = 1;
    const block = new Block({timestamp, lastHash, hash, data, nonce, difficulty});

    it('createBlock', () => {
        expect(block.timestamp).toEqual(timestamp);
        expect(block.lastHash).toEqual(lastHash);
        expect(block.hash).toEqual(hash);
        expect(block.data).toEqual(data);
        expect(block.nonce).toEqual(nonce);
        expect(block.difficulty).toEqual(difficulty);
    });

    describe('genesis()', () => {
        const genesisBlock = Block.genesisBlock();

        it('returns a Block instance', () => {
            expect(genesisBlock instanceof Block).toBe(true);
        })

        it('returns the genesis data', () => {
            expect(genesisBlock).toEqual(GENESIS_DATA);
        })
    });

    describe('mineBlock()', () => {
        const lastBlock = Block.genesisBlock();
        const data = 'mined data';
        const minedBlock = Block.mineBlock({lastBlock, data});

        it('returns a Block instance', () => {
            expect(minedBlock instanceof Block).toBe(true);
        })

        it('sets the `lastBlock` to be `hash` of the lastBlock', () => {
            // ожидания / реальность
            expect(minedBlock.lastHash).toEqual(lastBlock.hash);
        })

        it('sets the `data`', () => {
            // ожидания / реальность
            expect(minedBlock.data).toEqual(data);
        })

        it('sets the `timestamp`', () => {
            // ожидания / реальность
            expect(minedBlock.timestamp).not.toBe(undefined);
        })

        it('creates a SHA-256 `hash` based on the proper inputs', () => {
            // ожидания / реальность
            expect(minedBlock.hash)
                .toEqual(
                    cryptoHash(
                        minedBlock.timestamp,
                        minedBlock.nonce,
                        minedBlock.difficulty,
                        minedBlock.lastHash,
                        data))
        })

        it('sets a `hash` that matches the difficulty criteria', () => {
            // ожидания / реальность
            expect(hexToBinary(minedBlock.hash).substring(0, minedBlock.difficulty))
                .toEqual('0'.repeat(minedBlock.difficulty));
        })

        it('adjust the difficulty', () => {
            const possibleResults = [lastBlock.difficulty - 1, lastBlock.difficulty + 1];

            // ожидания / реальность
            expect(possibleResults.includes(minedBlock.difficulty)).toBe(true);
        })
    });

    describe('adjustDifficulty()', () => {
        it('raises the difficulty for a quickly mined block', () => {
            expect(Block.adjustDifficulty(
                {
                    originalBlock: block,
                    timestamp: block.timestamp + MINE_RATE - 100
                }))
                .toEqual(block.difficulty + 1);
        });

        it('lowers the difficulty for a slowly mined block', () => {
            block.difficulty = 20; // для того чтобы не было при -1 слишком маленьким
            expect(Block.adjustDifficulty({
                originalBlock: block,
                timestamp: block.timestamp + MINE_RATE + 100
            }))
                .toEqual(block.difficulty - 1);
        });

        it('has a lower limit of 1', () => {
            block.difficulty = -1;
            expect(Block.adjustDifficulty({
                originalBlock: block,
                timestamp: block.timestamp + MINE_RATE + 100
            }))
                .toEqual(1);
        });
    });
});