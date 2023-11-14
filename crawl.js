const {JSDOM} = require('jsdom')

function normalizeURL(baseURL) {
    const myURL = new URL(baseURL)
    let compURL = myURL.hostname + myURL.pathname
    if (compURL.endsWith('/') === true) {
        compURL = compURL.substring(0, compURL.length -1)
    }
    return compURL
}

function getURLsFromHTML(htmlBody, baseURL) {
    const urls = []
    const dom = new JSDOM(htmlBody)
    const linkElements = dom.window.document.querySelectorAll('a')
    for (const linkElement of linkElements) {
        if (linkElement.href.startsWith('/') === true) {
            try {
                const myURL = new URL(baseURL + linkElement.href)
                urls.push(myURL.href)
            } catch (err) {
                console.log(`Relative URL error: ${err.message}`)
            }
        }
        else {
            try {
                const myURL = new URL(linkElement.href)
                urls.push(myURL.href)
            } catch (err) {
                console.log(`Absolute URL error: ${err.message}`)
            }
        }
    }
    return urls
}

module.exports = {
    normalizeURL,
    getURLsFromHTML
}