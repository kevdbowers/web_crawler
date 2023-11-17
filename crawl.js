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

async function crawlPage(baseURL, currentURL, pages) {
    const baseURLObj = new URL(baseURL)
    const currentURLObj = new URL(currentURL)
    if (baseURLObj.hostname !== currentURLObj.hostname) {
        return pages
    }

    const normURL = normalizeURL(currentURL)
    if (pages[normURL] > 0) {
        pages[normURL]++
        return pages
    }

    pages[normURL] = 1

    console.log(`Actively crawling: ${currentURL}`)
    try {
        const resp = await fetch(currentURL)
        if (resp.status > 399) {
            console.log(`Error in fetch with statuscode: ${resp.status}, on page: ${currentURL}`)
            return pages
        }

        const contentType = resp.headers.get("content-type")
        if (!contentType.includes("text/html")) {
            console.log(`Non-HTML response, content type: ${resp.status}, on page: ${currentURL}`)
            return pages
        }

        const htmlBody = await resp.text()

        const nextURLs = getURLsFromHTML(htmlBody, baseURL)
        for (const nextURL of nextURLs) {
            pages = await crawlPage(baseURL, nextURL, pages)
        }
    } catch (err) {
        console.log(`Error in fetch: ${err.message}, on page: ${currentURL}`)
    }
    return pages
}

module.exports = {
    normalizeURL,
    getURLsFromHTML,
    crawlPage
}