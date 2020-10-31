# Price Tracker

...

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
