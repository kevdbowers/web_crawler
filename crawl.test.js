const {normalizeURL, getURLsFromHTML} = require('./crawl.js')

test('url test 1', () => {
    expect(normalizeURL('https://blog.boot.dev/path/')).toBe('blog.boot.dev/path')
})

test('url test 2', () => {
    expect(normalizeURL('https://blog.boot.dev/path')).toBe('blog.boot.dev/path')
})

test('url test 3', () => {
    expect(normalizeURL('http://blog.boot.dev/path/')).toBe('blog.boot.dev/path')
})

test('url test 4', () => {
    expect(normalizeURL('http://BLOG.boot.dev/path')).toBe('blog.boot.dev/path')
})

test('html test 1', () => {
    const htmlBody = `
    <html>
        <body>
            <a href="https://blog.boot.dev/path/">
                Boot.dev Blog
            </a>
        </body>
    </html>`
    expect(getURLsFromHTML(htmlBody, 'https://blog.boot.dev')).toEqual(['https://blog.boot.dev/path/'])
})

test('html test 2', () => {
    const htmlBody = `
    <html>
        <body>
            <a href="/path/">
                Boot.dev Blog
            </a>
        </body>
    </html>`
    expect(getURLsFromHTML(htmlBody, 'https://blog.boot.dev')).toEqual(['https://blog.boot.dev/path/'])
})

test('html test 3', () => {
    const htmlBody= `
    <html>
        <body>
            <a href="https://blog.boot.dev/path/">
                Boot.dev Blog
            </a>
            <a href="/path/">
                Boot.dev Blog
            </a>
        </body>
    </html>`
    expect(getURLsFromHTML(htmlBody, 'https://blog.boot.dev')).toEqual(['https://blog.boot.dev/path/', 'https://blog.boot.dev/path/'])
})

test('html test 4', () => {
    const htmlBody = `
    <html>
        <body>
            <a href="invalid">
                Invalid URL
            </a>
        </body>
    </html>`
    expect(getURLsFromHTML(htmlBody, 'https://blog.boot.dev')).toEqual([])
})