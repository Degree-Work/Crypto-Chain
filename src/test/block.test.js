const {GENESIS_DATA} = require("../config");
const {Block} = require("../block");

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
            expect(genesisBlock instanceof Block).toBe(true)
        })

        it('returns the genesis data', () => {
            expect(genesisBlock).toEqual(GENESIS_DATA)
        })
    })
});