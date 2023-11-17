const {sortPages} = require('./report.js')

test('sorting test 1', () => {
    const input = {
        'https://wagslane.dev/path' : 1,
        'https://wagslane.dev/path1' : 4,
        'https://wagslane.dev/path2' : 10,
        'https://wagslane.dev/path4' : 6,
        'https://wagslane.dev' : 3,
    }
    expect(sortPages(input)).toEqual([['https://wagslane.dev/path2', 10], ['https://wagslane.dev/path4', 6], ['https://wagslane.dev/path1', 4], ['https://wagslane.dev', 3], ['https://wagslane.dev/path', 1]])
})