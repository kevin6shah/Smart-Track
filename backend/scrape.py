import ssl
import smtplib
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
from random_user_agent.user_agent import UserAgent
from random_user_agent.params import SoftwareName, OperatingSystem
from urllib.parse import urlparse
import itertools
from colorama import init, Fore
init(autoreset=True)

def sendConfirmation(success_rate):
    port = 587  # For starttls
    smtp_server = "smtp.gmail.com"
    sender_email = "smarttrack698@gmail.com"
    receiver_email = os.environ.get("CONFIRMATION_EMAIL")
    password = os.environ.get("SENDER_PWD")

    message = f"""From: Smart Track <{sender_email}>
To: <{receiver_email}>
Subject: Daily Success Rate

Dear Admin User,

The success rate for today was {success_rate}%.

Thanks,
Your Smart Track Team
"""

    context = ssl.create_default_context()
    with smtplib.SMTP(smtp_server, port) as server:
        server.ehlo()  # Can be omitted
        server.starttls(context=context)
        server.ehlo()  # Can be omitted
        server.login(sender_email, password)
        server.sendmail(sender_email, receiver_email, message)

def sendEmails(item, newPrice):
    emailMap = item['emailMap']
    title = item['title']
    port = 587  # For starttls
    smtp_server = "smtp.gmail.com"
    sender_email = "smarttrack698@gmail.com"
    password = os.environ.get("SENDER_PWD")

    for email in emailMap:
        threshold = emailMap[email]
        if (float(newPrice) < float(threshold)):
            message = f"""From: Smart Track <{sender_email}>
To: <{email}>
Subject: Price Drop Alert

Smart Track User,

The following item that you are tracking has dropped in price:

{title}

Current Price: ${newPrice}
Threshold Price: ${threshold}

{item['url']}

Thanks,
Your Smart Track Team
"""

            context = ssl.create_default_context()
            with smtplib.SMTP(smtp_server, port) as server:
                server.ehlo()  # Can be omitted
                server.starttls(context=context)
                server.ehlo()  # Can be omitted
                server.login(sender_email, password)
                server.sendmail(sender_email, email, message)

def configure_logging():
    '''
    Sets up logging format, output, and other config.
    Had to cast log_file env var to surpress none + str error.
    Switch to StreamHandler to output to stdout instead of file.
    '''

    logger = logging.getLogger()
    logger.setLevel(logging.INFO)
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
    softwareNames = [SoftwareName.CHROME.value]
    OperatingSystems = [OperatingSystem.WINDOWS.value,
                        OperatingSystem.LINUX.value]
    user_agent_rotator = UserAgent(software_names=softwareNames,
                           operating_systems=OperatingSystems, limit=100)
    user_agent = user_agent_rotator.get_random_user_agent()

    options = webdriver.ChromeOptions()
    prefs = {"profile.managed_default_content_settings.images": 2}
    options.add_experimental_option("prefs", prefs)
    options.add_argument('--headless')
    options.add_argument('--no-sandbox')
    options.add_argument('--window-size=1420,1080')
    options.add_argument('--disable-gpu')
    options.add_argument(f'user-agent={user_agent}')

    wd = webdriver.Chrome(
        executable_path=driver_path,
        service_log_path=log_path,
        options=options)

    return wd


def get_items(db):
    items_ref = db.collection(u'items')
    docs = items_ref.stream()
    docs_dict = {}
    for doc in docs:
        doc_temp_dict = doc.to_dict()
        if (len(doc_temp_dict['emailMap']) > 0):
            docs_dict[doc.id] = doc_temp_dict

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
    fail = 0
    success = 0
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
                    print(Fore.GREEN + 'update needed old', oldPrice, 'new', newPrice)
                    logger.info(
                        f'updating price for {title} to {newPrice}')
                    update_db(db, items, ID, newPrice)
                    sendEmails(items[ID], newPrice)
                elementFound = True
                success += 1
                break
            except:
                pass

        if (not elementFound):
            print(Fore.RED + f'An error occurred while scraping [{ID}] {title}')
            logger.warning(
                f'Could not scrape [{ID}] {title}...')
            fail += 1

    successRate = round(float(success/(fail + success)) * 100, 2)
    print(Fore.CYAN + f'Scraping Finished | Success Rate: {successRate}%')
    logger.info(
        f'Scraping Finished | Success Rate: {successRate}%')
    sendConfirmation(successRate)


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

    wd.quit()


if __name__ == '__main__':
    main()
