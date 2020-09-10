const {GENESIS_DATA} = require("../config");
const {Block} = require("../block");
const {cryptoHash} = require("../cryptoHash");

describe('Block', () => {
    const timestamp = 'a-data';
    const lastHash = 'foo-hash';
    const hash = 'bar-hash';
    const data = ['blockchain', 'data'];
    const block = new Block({timestamp, lastHash, hash, data});

    it('createBlock', () => {
        expect(block.timestamp).toEqual(timestamp);
        expect(block.lastHash).toEqual(lastHash);
        expect(block.hash).toEqual(hash);
        expect(block.data).toEqual(data);
    })


    describe('genesis()', () => {
        const genesisBlock = Block.genesisBlock();

        it('returns a Block instance', () => {
            expect(genesisBlock instanceof Block).toBe(true);
        })

        it('returns the genesis data', () => {
            expect(genesisBlock).toEqual(GENESIS_DATA);
        })
    })

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
                .toEqual(cryptoHash(minedBlock.timestamp, lastBlock.hash, data))
        })
    })
});