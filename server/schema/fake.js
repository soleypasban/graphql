const FakeProducts = [
    { id: '1', name: 'Yellow duck', factory: '1', amount: 5 },
    { id: '2', name: 'Plastic bone', factory: '1', amount: 7 },
    { id: '3', name: 'Pen', factory: '2', amount: 30 },
]

const FakeFactories = [
    { id: '1', name: 'toy factory', location: 'USA' },
    { id: '2', name: 'blue pen factory', location: 'EU' },
    { id: '3', name: 'eagle eyes factory', location: 'China' },
]

module.exports = ({
    FakeProducts,
    FakeFactories
})