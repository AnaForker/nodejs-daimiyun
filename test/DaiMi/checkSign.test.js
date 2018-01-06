import DaiMi from '../../src/DaiMi'

test('Test check sign with no sign', () => {
    expect(DaiMi.checkSign({}, '233')).toBeFalsy()
})

test('Test sign', () => {
    const sign = DaiMi.sign({
        test: 'value',
        another: 'value',
    }, 'test')

    expect(sign).toBe('2840f48e697504bc8d23f03b6565f480594526a4')
})
