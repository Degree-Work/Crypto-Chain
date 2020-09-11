const INITIAL_DIFFICULTY = 3; // начальная сложность

const MINE_RATE = 1000; // 1 second

const GENESIS_DATA = {
    timestamp: Date.now(),
    lastHash: '-----',
    hash: 'hash-one',
    difficulty: INITIAL_DIFFICULTY,
    nonce: 0,
    data: []
};


module.exports = {GENESIS_DATA, MINE_RATE};