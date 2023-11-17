function sortPages(pages) {
    pagesArr = Object.entries(pages)
    pagesArr.sort((a, b) => {
        aHits = a[1]
        bHits = b[1]
        return b[1] - a[1]
    })
    return pagesArr
}

function printReport(pages) {
    console.log(`====================`)
    console.log(`Generating report...`)
    console.log(`====================`)
    const sortedPages = sortPages(pages)
    for (const page of sortedPages) {
        console.log(`Found ${page[1]} internal links to ${page[0]}`)
    }
}

module.exports = {
    sortPages,
    printReport
}