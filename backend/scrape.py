import os
import logging
import datetime
from dotenv import load_dotenv, find_dotenv
import firebase_admin
from firebase_admin import credentials
from firebase_admin import firestore
from bs4 import BeautifulSoup
from selenium import webdriver
from selenium.webdriver.firefox.options import Options
from urllib.parse import urlparse
import itertools

def configure_logging():
    '''
    Sets up logging format, output, and other config.
    Had to cast log_file env var to surpress none + str error.
    Switch to StreamHandler to output to stdout instead of file.
    '''

    logger = logging.getLogger()
    logger.setLevel(logging.DEBUG)
    log_path = str(os.environ.get("LOG_FILE")) + "scrape.log"
    handler = logging.FileHandler(log_path)
    # handler = logging.StreamHandler()
    handler.setFormatter(logging.Formatter(
        '[%(asctime)s %(levelname)s %(module)s]: %(message)s'))
    logger.addHandler(handler)
    return logger


load_dotenv(find_dotenv())
logger = configure_logging()
REQUEST_HEADER = {
    'User-Agent': "Mozilla/5.0 (Windows NT 6.1; WOW64)"}


def init_webdriver_ff():
    '''
    Set up webdriver configuration
    Uses firefox geckodriver
    WebGL doesnt load in headless mode so attempt to disable images
    '''
    log_path = os.environ.get("LOG_FILE") + "geckodriver.log"
    driver_path = os.environ.get("WEBDRIVER")
    profile = webdriver.FirefoxProfile()
    profile.set_preference('permissions.default.image', 2)
    profile.set_preference('dom.ipc.plugins.enabled.libflashplayer.so', False)

    options = Options()
    options.headless = False
    wd = webdriver.Firefox(
        executable_path=driver_path,
        service_log_path=log_path,
        options=options,
        firefox_profile=profile)

    return wd


def init_webdriver():
    '''
    Set up webdriver configuration
    Uses chrome webdriver
    Headless and doesnt load images
    '''
    log_path = os.environ.get("LOG_FILE") + "webdriver.log"
    driver_path = os.environ.get("WEBDRIVER")

    options = webdriver.ChromeOptions()
    options.headless = False
    prefs = {"profile.managed_default_content_settings.images": 2}
    options.add_experimental_option("prefs", prefs)

    wd = webdriver.Chrome(
        executable_path=driver_path,
        service_log_path=log_path,
        options=options)

    return wd


def get_items(db):
    items_ref = db.collection(u'items')
    docs = items_ref.stream()
    docs_dict = {doc.id: doc.to_dict() for doc in docs}

    return docs_dict


def get_templates(db):
    sites_ref = db.collection(u'templates')
    docs = sites_ref.stream()
    docs_dict = {doc.id: doc.to_dict() for doc in docs}

    return docs_dict


def scrape(wd, db, templates, items):
    '''
    Main scrape method
    @TODO break this down into multiple methods
    '''
    for ID in items:
        title = items[ID]['title'][:20]
        url = items[ID]['url']
        parsedURL = urlparse(url)
        hostname = parsedURL.hostname.replace('www.', '')
        hostname = hostname[:hostname.index('.')]

        if hostname not in templates:
            print(f"site {hostname} not in templates dict")
            continue

        wd.get(url)
        soup = BeautifulSoup(wd.page_source, features="html.parser")
        tag = templates[hostname]['price']['tag']
        attributes = templates[hostname]['price']['attributes']
        attrArray = []

        for attr, value in attributes.items():
            attrArray.append(value)

        print(f"Checking next tag for: [{ID}] {title}...")

        elementFound = False

        for possibility in itertools.product(*attrArray):
            element = list(possibility)
            attrDict = {}
            i = 0
            for attr in attributes:
                attrDict[attr] = element[i]
                i += 1

            scrapedElement = soup.find(tag, attrDict)

            try:
                newPrice = scrapedElement.getText().strip().split('$')[1]
                newPrice = round(float(newPrice.split()[0]), 2)
                oldPrice = float(items[ID]['priceHistory'][-1]['price'])
                if (oldPrice != newPrice):
                    print('update needed old', oldPrice, 'new', newPrice)
                    logger.info(
                        f'updating price for {title} to {newPrice}')
                    update_db(db, items, ID, newPrice)
                elementFound = True
                break
            except:
                pass

        if (not elementFound):
            print(f'An error occurred while scraping [{ID}] {title}')
            logger.error(
                f'Could not scrape [{ID}] {title}')


def update_db(db, items, k, new_price):
    items_ref = db.collection(u'items').document(k)
    price_entry = {u'date': datetime.datetime.now(), u'price': new_price}
    items_ref.update({u'priceHistory': firestore.ArrayUnion([price_entry])})


def main():
    cred_path = os.environ.get("GOOGLE_APPLICATION_CREDENTIALS")

    logger.info("Initiating service account connection")
    cred = credentials.Certificate(cred_path)
    firebase_admin.initialize_app(cred)
    db = firestore.client()

    logger.info("Initializing driver")
    wd = init_webdriver()

    try:
        logger.info("Querying Items")
        items = get_items(db)

        logger.info("Querying Websites")
        templates = get_templates(db)

        logger.info("Scraping")
        scrape(wd, db, templates, items)
    except Exception as e:
        print(e)
        logger.error(e)

    logger.info("Finished")
    wd.quit()


if __name__ == '__main__':
    main()
