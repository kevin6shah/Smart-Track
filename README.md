# Smart Track

Online shopping has become the new norm when it comes to purchasing items. Companies like Amazon, eBay, Alibaba are dominating the e-commerce market. For example, approximately 127 million households employ the usage of Amazon. As we move towards online shopping, we are constantly searching for deals for the products that we really want and or to avoid being the victim of scams. One of the best ways to find the best deals is by using price trackers. However, most trackers currently in the market only target the above mentioned e-commerce companies. Conversely, Smart Track will allow users to track prices for any e-commerce website using a templating scheme that would be specific particular to a given website. The extension would then dynamically be able to provide users with pricing information so that they can be informed before making a big purchase especially during present times where because of COVID-19, online ecommerce has become much more prevalent.

## Languages/Technologies Used

- HTML: Used HTML to create the popup & options page structure.
- CSS & BootStrap5: Used to add visual elements and themes to the extension.
- JS & ReactJS: Used to implement UI and connect the website to the backend database and business logic.
- Python: Script used for scraping items and sending email notifications to users when price reaches below a threshold.
- Firestore and Firebase Auth: Authentication and backend database that stores price history, user/item information, templates, etc.
- AWS EC2 & Cronjob: Runs backend python scraper scheduled by a chronjob in an EC2 server.

## Screenshots

<table>
  <tr>
    <td><img src="/assets/1.png"></td>
    <td><img src="/assets/2.png"></td>
  </tr>
  <tr>
    <td><img src="/assets/3.png"></td>
    <td><img src="/assets/4.png"></td>
  </tr>
  <tr>
    <td><img src="/assets/5.png"></td>
    <td><img src="/assets/6.png"></td>
  </tr>
</table>

## Prerequisites

Before you begin, ensure you have met the following requirements:

- `<npm/6.13.6>`
- `<node/10.15.3>` [download both here](2)

To run in conjunction with php backend:

- `<PHP/7.3.6>` [download](4)
- `<ODBC Driver SQL Server/13>` [download](3)

## Installation

Windows:

```bash
git clone 

```

## Usage

To run for development, follow these steps:

```bash
npm run start
```

To create a deployable bundle

```bash
npm run build
```

## Helpful Commands

- Watch the log file
  `Get-Content -Path .\web\logs\index_php.log -Wait`
- Start the php dev server
  `php -S 127.0.0.1:8080 -t .\web\`
- Compile and hot reload the react files
  `npm run watch`

## Configuration

- webpack dev server proxy can be configured through `package.json` in [proxy][1] field

## Workflow

To contribute, follow these steps:

1. Clone this repository.
2. Create a branch: `git checkout -b <branch_name>`.
3. Make your changes and commit them: `git commit -m '<commit_message>'`
4. Push to the original branch: `git push origin <project_name>/<location>`
5. Create the pull request.

Useful resource on [gitflow](https://www.atlassian.com/git/tutorials/comparing-workflows/gitflow-workflow)

Alternatively see the GitHub documentation on [creating a pull request](https://help.github.com/en/github/collaborating-with-issues-and-pull-requests/creating-a-pull-request).

## Road Map

- add landing page with menu
- add script that watches the web folder and restarts the php server on changes/saves
- modify that script so that it outputs the log file and server debug at the same time

1. take delivery
2. recieving
3. price label

## React Reference

- [patterns](https://reactpatterns.com/)
- [setState](https://www.freecodecamp.org/news/get-pro-with-react-setstate-in-10-minutes-d38251d1c781/)

<!-- Links -->

[1]: (https://create-react-app.dev/docs/proxying-api-requests-in-development/#configuring-the-proxy-manually)
[2]: (https://nodejs.org/en/download/)
[3]: (https://docs.microsoft.com/en-us/sql/connect/odbc/windows/release-notes-odbc-sql-server-windows?view=sqlallproducts-allversions)
[4]: (https://windows.php.net/download/)
