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

function cartesian(...args) {
    var r = [], max = args.length-1;
    function helper(arr, i) {
        for (var j=0, l=args[i].length; j<l; j++) {
            var a = arr.slice(0); // clone arr
            a.push(args[i][j]);
            if (i==max)
                r.push(a);
            else
                helper(a, i+1);
        }
    }
    helper([], 0);
    return r;
}

function scrapeItem(template, soup, itemType) {
    const scrapingAttributes = template[itemType]['attributes']
    let attributeArrays = []

    for (const attr in scrapingAttributes) {
        attributeArrays.push(scrapingAttributes[attr])
    }

    try {
        attributeArrays = cartesian(...attributeArrays)

        for (var i = 0; i < attributeArrays.length; i++) {
            let attributeMap = {}
            let j = 0
            for (const attr in scrapingAttributes) {
                attributeMap[[attr]] = attributeArrays[i][j]
                j = j + 1
            }
            const scrapingElement = soup.find(template[itemType]['tag'], attributeMap)
            if (scrapingElement !== undefined) {
                if (itemType === 'price') {
                    return currencyToFloat(scrapingElement.getText().trim())
                } else if (itemType === 'title') {
                    return scrapingElement.getText().trim()
                } else if (itemType === 'img') {
                    return scrapingElement.descendants[0].attrs.src
                }
            }
        }
    } catch (e) {}

    return ''
}

function scrapeData(html, template) {
    var soup = new JSSoup(html)
    let price = '', title = '', img = ''

    if (template !== undefined) {
        price = scrapeItem(template, soup, 'price')
        title = scrapeItem(template, soup, 'title')
        img = scrapeItem(template, soup, 'img')
    }

    return {
        'price': price,
        'title': title,
        'img': img,
    }
}

function getTemplateSelector(html) {
    var soup = new JSSoup(html)
    const doc = document.getElementsByTagName('body')[0]
    var MOUSE_VISITED_CLASSNAME = 'crx_mouse_visited';
    var prevDOM = null;
    let template = {}

    function hover(e) {
        var srcElement = e.srcElement;
        if (prevDOM != null) {
            prevDOM.classList.remove(MOUSE_VISITED_CLASSNAME);
        }
        srcElement.classList.add(MOUSE_VISITED_CLASSNAME);
        prevDOM = srcElement;
    }

    function onClickPrice(e) {
        doc.removeEventListener("mousemove", hover)
        doc.removeEventListener("click", onClickPrice)
        prevDOM.classList.remove(MOUSE_VISITED_CLASSNAME);
        const tag = e.target.tagName.toLowerCase()
        const attributes = e.target.attributes
        let attrMap = {}

        for (var i = 0; i < attributes.length; i++) {
            attrMap[[attributes[i].nodeName]] = [attributes[i].nodeValue]
        }

        const element = {
            tag: tag,
            attributes: attrMap
        }

        const price = scrapeItem({price: element}, soup, 'price')

        if (confirm("Is this price correct?: " + price)) {
            template['price'] = element
            console.log(template)
            alert("SUCCESS!")
            // alert("Please select product image")
            // doc.addEventListener("click", onClickPrice)
            // doc.addEventListener("mousemove", hover)
        } else {
            if (confirm("Would you like to try again?")) {
                doc.addEventListener("click", onClickPrice)
                doc.addEventListener("mousemove", hover)
            }
        }
    }

    function onClickTitle(e) {
        doc.removeEventListener("mousemove", hover)
        doc.removeEventListener("click", onClickTitle)
        prevDOM.classList.remove(MOUSE_VISITED_CLASSNAME);
        const tag = e.target.tagName.toLowerCase()
        const attributes = e.target.attributes
        let attrMap = {}

        for (var i = 0; i < attributes.length; i++) {
            attrMap[[attributes[i].nodeName]] = [attributes[i].nodeValue]
        }

        const element = {
            tag: tag,
            attributes: attrMap
        }

        const title = scrapeItem({title: element}, soup, 'title')

        if (confirm("Is this title correct?: " + title)) {
            template['title'] = element
            alert("Please select product price")
            doc.addEventListener("click", onClickPrice)
            doc.addEventListener("mousemove", hover)
        } else {
            if (confirm("Would you like to try again?")) {
                doc.addEventListener("click", onClickTitle)
                doc.addEventListener("mousemove", hover)
            }
        }
    }

    alert("Please select product title")
    doc.addEventListener("click", onClickTitle)
    doc.addEventListener("mousemove", hover)
}

// chrome.extension.onRequest.addListener(function (request, sender, sendResponse) {
//     if (request.greeting == "startSelector") {
//         getTemplateSelector()
//     }
// })

const scrapeTemplate = {
    amazon : {
        price: {
            tag: 'span',
            attributes: {
                id: ['priceblock_dealprice', 'priceblock_saleprice', 'priceblock_ourprice'],
                class: ['a-size-large product-title-word-break']
            }
        },
        title: {
            tag: 'span',
            attributes: {
                id: ['productTitle']
            }
        },
        img: {
            tag: 'div',
            attributes: {
                id: ['imgTagWrapperId']
            }
        }
    },
    ebay : {
        price: {
            tag: 'span',
            attributes: {
                id: ['prcIsum', 'mm-saleDscPrc']
            }
        },
        title: {
            tag: 'h1',
            attributes: {
                id: ['itemTitle']
            }
        },
        img: {
            tag: 'div',
            attributes: {
                id: ['mainImgHldr']
            }
        }
    }
}

const rawHtml = DOMtoString(document)

getTemplateSelector(rawHtml)

let hostname = window.location.hostname.replace('www.', '')
hostname = hostname.substring(0, hostname.indexOf('.'))

let data = scrapeData(rawHtml, scrapeTemplate[hostname])
data['url'] = window.location.toString()

console.log(data)

chrome.storage.local.set({ scrapedData: data });