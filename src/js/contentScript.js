import JSSoup from 'jssoup';
// localStorage.setItem("YO", 'Yo')

function DOMtoString(document_root) {
    var html = '',
        node = document_root.firstChild;
    while (node) {
        switch (node.nodeType) {
        case Node.ELEMENT_NODE:
            html += node.outerHTML;
            break;
        case Node.TEXT_NODE:
            html += node.nodeValue;
            break;
        case Node.CDATA_SECTION_NODE:
            html += '<![CDATA[' + node.nodeValue + ']]>';
            break;
        case Node.COMMENT_NODE:
            html += '<!--' + node.nodeValue + '-->';
            break;
        case Node.DOCUMENT_TYPE_NODE:
            // (X)HTML documents are identified by public identifiers
            html += "<!DOCTYPE " + node.name + (node.publicId ? ' PUBLIC "' + node.publicId + '"' : '') + (!node.publicId && node.systemId ? ' SYSTEM' : '') + (node.systemId ? ' "' + node.systemId + '"' : '') + '>\n';
            break;
        }
        node = node.nextSibling;
    }
    return html;
}

function scrapeAmazonData(html) {
    var soup = new JSSoup(html)
    let price = 'Not available', title = 'Not available'
    let img = 'https://www.bu.edu/bedac/files/2015/10/Photo-placeholder.jpg'
    const priceIDs = ['priceblock_ourprice', 'priceblock_saleprice', 'priceblock_dealprice']

    for (var i = 0; i < priceIDs.length; i++) {
        const priceElement = soup.find('span', { 'id': priceIDs[i] })
        if (priceElement !== undefined) {
            price = priceElement.getText()
            break;
        }
    }
    try {
        title = soup.find('span', { 'id': 'productTitle' }).getText().trim()
    } catch (e) {}
    try {
        img = soup.find('div', { 'id': 'imgTagWrapperId' }).descendants[0].attrs.src
    } catch (e) {}

    return {
        'price': price,
        'title': title,
        'img': img,
    }
}

const rawHtml = DOMtoString(document)

let data = scrapeAmazonData(rawHtml)

chrome.storage.local.set({ scrapedData: data });