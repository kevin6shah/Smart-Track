import JSSoup from 'jssoup';
import firebase from 'firebase'
require("firebase/firestore");

function initializeFirebase() {
    // Your web app's Firebase configuration
    // For Firebase JS SDK v7.20.0 and later, measurementId is optional
    var firebaseConfig = {
    apiKey: "AIzaSyBbg-3-MdPoJEqIYsy7oPY-ygiG_nbEFDQ",
    authDomain: "smart-track-d9d47.firebaseapp.com",
    databaseURL: "https://smart-track-d9d47.firebaseio.com",
    projectId: "smart-track-d9d47",
    storageBucket: "smart-track-d9d47.appspot.com",
    messagingSenderId: "1037701953092",
    appId: "1:1037701953092:web:221a8548a2dcfd13186e11",
    measurementId: "G-Q7JZX1QQ9V"
    };
    // Initialize Firebase
    firebase.initializeApp(firebaseConfig);
    firebase.analytics();
}

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

function scrapeItem(template, soup, itemType, getElement) {
    try {
        const scrapingAttributes = template[itemType]['attributes']
        let attributeArrays = []

        for (const attr in scrapingAttributes) {
            attributeArrays.push(scrapingAttributes[attr])
        }

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
                    if (getElement && getElement === true) {
                        return scrapingElement.findAll('img')[0]
                    } else if (template[itemType]['tag'] === 'img') {
                        return scrapingElement.attrs.src
                    } else return scrapingElement.findAll('img')[0].attrs.src
                }
            }
        }
    } catch (e) {
        console.log("There must be an error with the template")
    }

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

    function sendToFirestore() {
        initializeFirebase()
        let db = firebase.firestore()

        db.collection("templates")
            .doc(hostname).get().then((snapshot) => {
                if (!snapshot.exists) {
                    db.collection('templates').doc(hostname).set(template).then(() => {
                        chrome.runtime.sendMessage({ message: "fetchData" }, function (response) {
                            if (response && response.status === 'success') {
                                let data = scrapeData(rawHtml, template)
                                data['url'] = window.location.toString()
                                chrome.storage.sync.set({ scrapedData: data });
                                alert("Template creation was successful, please open the Smart Track extension and track the desired product")
                            } else {
                                alert("Template creation was not successful. Please try again later")
                            }
                        });
                    })
                } else {
                    let fbTemplate = snapshot.data()
                    for (const key in fbTemplate) {
                        if (template[key] !== undefined) {
                            for (const attr in fbTemplate[key]['attributes']) {
                                if (fbTemplate[key]['attributes'][attr].
                                    includes(template[key]['attributes'][attr][0]) !== true) {
                                    fbTemplate[key]['attributes'][attr].
                                        push(template[key]['attributes'][attr][0])
                                    }
                            }
                        }
                    }
                    db.collection('templates').doc(hostname).set(fbTemplate).then(() => {
                        chrome.runtime.sendMessage({ message: "fetchData" }, function (response) {
                            if (response && response.status === 'success') {
                                let data = scrapeData(rawHtml, fbTemplate)
                                data['url'] = window.location.toString()
                                chrome.storage.sync.set({ scrapedData: data });
                                alert("Template creation was successful, please open the Smart Track extension and track the desired product")
                            } else {
                                alert("Template creation was not successful. Please try again later")
                            }
                        });
                    })
                }
            })
    }

    function hover(e) {
        var srcElement = e.srcElement;
        if (prevDOM != null) {
            prevDOM.classList.remove(MOUSE_VISITED_CLASSNAME);
        }
        srcElement.classList.add(MOUSE_VISITED_CLASSNAME);
        prevDOM = srcElement;
    }

    function generateAttributesMap(attributes, lookFor) {
        let attrMap = {}

        for (var i = 0; i < attributes.length; i++) {
            if (attributes[i].nodeName === 'class') {
                let values = attributes[i].nodeValue.split(' ')
                let selectedValue = ''
                for (var j = 0; j < values.length; j++) {
                    if (values[j].toLowerCase().includes(lookFor)) {
                        selectedValue = values[j]
                        break
                    }
                }
                if (selectedValue !== '') {
                    attrMap[[attributes[i].nodeName]] = [selectedValue]
                } else {
                    attrMap[[attributes[i].nodeName]] = [attributes[i].nodeValue]
                }
            } else {
                attrMap[[attributes[i].nodeName]] = [attributes[i].nodeValue]
            }
        }

        return attrMap
    }

    function onClickImage(e) {
        doc.removeEventListener("mousemove", hover)
        doc.removeEventListener("click", onClickImage)
        prevDOM.classList.remove(MOUSE_VISITED_CLASSNAME);

        const tag = e.target.tagName.toLowerCase()
        const attributes = e.target.attributes

        let attrMap = generateAttributesMap(attributes, 'image')

        let element = {
            tag: tag,
            attributes: attrMap
        }

        delete element['attributes']['src']

        if (attrMap['id'] !== undefined) {
            element = {
                tag: tag,
                attributes: {
                    id: attrMap['id']
                }
            }
        } else if (attrMap['class'] !== undefined) {
            element = {
                tag: tag,
                attributes: {
                    class: attrMap['class']
                }
            }
        }

        const emt = scrapeItem({ img: element }, soup, 'img', true)

        try {
            const src = emt.attrs.src

            attrMap = emt.attrs

            element = {
                tag: 'img',
                attributes: attrMap
            }

            delete element['attributes']['src']
            delete element['attributes']['alt']

            for (const key in element['attributes']) {
                element['attributes'][key] = [element['attributes'][key]]
            }

            if (element['attributes']['id'] !== undefined) {
                element = {
                    tag: 'img',
                    attributes: {
                        id: element['attributes']['id'] 
                    }
                }
            } else if (element['attributes']['class'] !== undefined) {
                element = {
                    tag: 'img',
                    attributes: {
                        class: element['attributes']['class']
                    }
                }
            }

            if (confirm("Is this image link correct?: " + src)) {
                template['img'] = element
                sendToFirestore()
            } else {
                if (confirm("Would you like to try again? (Optional)")) {
                    doc.addEventListener("click", onClickImage)
                    doc.addEventListener("mousemove", hover)
                } else {
                    sendToFirestore()
                }
            }
        } catch (e) {
            if (confirm("This element could not be selected. Do you want to try again? (Optional)")) {
                doc.addEventListener("click", onClickImage)
                doc.addEventListener("mousemove", hover)
            } else {
                sendToFirestore()
            }
        }
    }

    function onClickPrice(e) {
        doc.removeEventListener("mousemove", hover)
        doc.removeEventListener("click", onClickPrice)
        prevDOM.classList.remove(MOUSE_VISITED_CLASSNAME);
        const tag = e.target.tagName.toLowerCase()
        const attributes = e.target.attributes

        let attrMap = generateAttributesMap(attributes, 'price')

        let element = {
            tag: tag,
            attributes: attrMap
        }

        if (attrMap['id'] !== undefined) {
            element = {
                tag: tag,
                attributes: {
                    id: attrMap['id']
                }
            }
        } else if (attrMap['class'] !== undefined) {
            element = {
                tag: tag,
                attributes: {
                    class: attrMap['class']
                }
            }
        }

        const price = scrapeItem({price: element}, soup, 'price')

        if (confirm("Is this price correct?: " + price)) {
            template['price'] = element
            alert("Please select product image")
            doc.addEventListener("click", onClickImage)
            doc.addEventListener("mousemove", hover)
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
        
        let attrMap = generateAttributesMap(attributes, 'title')

        let element = {
            tag: tag,
            attributes: attrMap
        }

        if (attrMap['id'] !== undefined) {
            element = {
                tag: tag,
                attributes: {
                    id: attrMap['id']
                }
            }
        } else if (attrMap['class'] !== undefined) {
            element = {
                tag: tag,
                attributes: {
                    class: attrMap['class']
                }
            }
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

const rawHtml = DOMtoString(document)
let hostname = window.location.hostname.replace('www.', '')
hostname = hostname.substring(0, hostname.indexOf('.'))

chrome.extension.onRequest.addListener(function (request, sender, sendResponse) {
    if (request.greeting == "startSelector") {
        getTemplateSelector(rawHtml)
    }
})

chrome.storage.sync.get('templates', function(backgroundData) {
    const scrapeTemplate = backgroundData.templates
    let data = scrapeData(rawHtml, scrapeTemplate[hostname])
    data['url'] = window.location.toString()
    console.log(data)
    chrome.storage.sync.set({ scrapedData: data });
});