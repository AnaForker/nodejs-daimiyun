import DaiMi from '../../src/DaiMi'

const daimi = new DaiMi({})

test('Trade price should > 0', () => {
    const createTask = daimi.createTrade({
        type: 'alipay',
        price: 0,
        descp: 'Test trade',
    })

    expect.assertions(1)
    expect(createTask).rejects.toThrow(Error)
})

test('Unsupport payment type', () => {
    const createTask = daimi.createTrade({
        type: 'paypal',
        price: 1,
        descp: 'Test trade',
    })

    expect.assertions(1)
    expect(createTask).rejects.toThrow(Error)
})
