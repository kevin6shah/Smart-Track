import JSSoup from 'jssoup';

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

function currencyToFloat(currency) {
    return parseFloat(parseFloat(currency.
                        replace(/[^0-9.-]+/g, "")).toFixed(2))
}

function scrapeData(html, template) {
    var soup = new JSSoup(html)
    let price = '', title = '', img = ''
    const priceIDs = template['price']['attribute'][1]

    for (var i = 0; i < priceIDs.length; i++) {
        let attributeMap = {}
        attributeMap[template['price']['attribute'][0]] = priceIDs[i]
        const priceElement = soup.find(template['price']['tag'], attributeMap)
        if (priceElement !== undefined) {
            price = priceElement.getText()
            break;
        }
    }
    try {
        let attributeMap = {}
        attributeMap[template['title']['attribute'][0]] = template['title']['attribute'][1]
        title = soup.find(template['title']['tag'], attributeMap).getText().trim()
    } catch (e) {}
    try {
        let attributeMap = {}
        let desc = 0
        if (template['img']['descendants'] !== undefined) desc = parseInt(template['img']['descendants'])
        attributeMap[template['img']['attribute'][0]] = template['img']['attribute'][1]
        img = soup.find(template['img']['tag'], attributeMap).descendants[desc].attrs.src
    } catch (e) {}

    return {
        'price': currencyToFloat(price),
        'title': title,
        'img': img,
    }
}

const scrapeTemplate = {
    amazon : {
        price: {
            tag: 'span',
            attribute: ['id', ['priceblock_dealprice', 'priceblock_saleprice', 'priceblock_ourprice']]
        },
        title: {
            tag: 'span',
            attribute: ['id', 'productTitle']
        },
        img: {
            tag: 'div',
            attribute: ['id', 'imgTagWrapperId']
        }
    },
    ebay : {
        price: {
            tag: 'span',
            attribute: ['id', ['prcIsum', 'mm-saleDscPrc']]
        },
        title: {
            tag: 'h1',
            attribute: ['id', 'itemTitle']
        },
        img: {
            tag: 'div',
            attribute: ['id', 'mainImgHldr'],
            descendants: 2,
        }
    }
}

const rawHtml = DOMtoString(document)

let hostname = window.location.hostname.replace('www.', '')
hostname = hostname.substring(0, hostname.indexOf('.'))

let data = scrapeData(rawHtml, scrapeTemplate[hostname])
data['url'] = window.location.toString()

console.log(data)

chrome.storage.local.set({ scrapedData: data });