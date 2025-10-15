# Welcome to Kusto Open AI Extension Repo:

This project is an Edge Extension which helps you to ask questions to Open AI on your Queried Table.

## Requirements

- [Node.js](https://nodejs.org/en) install in your Desktop/Laptop.
- Edge Browser
- Access to Azure Data Explorer online - [link](https://dataexplorer.azure.com/)

In the project directory, you can run:

## Steps to build

- Create a json file in [./react-kusto-extension/src](./react-kusto-extension/src) name it "apikey.json"
- Add JSON value in apikey.json with Open AI API Key in the given [format](apiKeyFormat.json)
- On Command prompt run "Cd ./react-kusto-extension"
- Run "npm install"
- Run "npm run build"

## Steps to run on Edge

 - Open the edge extensions window: edge://extensions/
 - Enable the developer mode on the left pane
 - Click on load unpacked button
 - Choose the folder, "Hack2023-KustoExtension-App\extension" to load the extension
