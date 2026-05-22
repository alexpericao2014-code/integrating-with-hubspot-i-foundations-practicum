# Integrating With HubSpot I: Foundations Practicum

This is my submission for the Integrating With HubSpot I: Foundations practicum.

## Project Overview

This Node.js application uses Express, Axios, and Pug to connect to the HubSpot CRM API.

The app displays records from a HubSpot custom object and allows a user to create a new custom object record through a form.

## HubSpot Private App

Private app name:

Alexandre's Practicum Private App

The private app access token is stored locally in a `.env` file and is not included in this repository.

## Custom Object

Custom object used:

Books

Custom object type:

p51490362_books

Object type ID:

2-6917636

Properties:

- Name
- Author
- Genre

## HubSpot Custom Object List View

https://app.hubspot.com/contacts/51490362/objects/2-6917636/views/all/list

## Routes

- `GET /` - Displays Books custom object records in a table.
- `GET /update-cobj` - Displays a form to create a new Book record.
- `POST /update-cobj` - Creates a new Book record in HubSpot and redirects to the homepage.

## Local Setup

Create a `.env` file with the following variables:

```env
HUBSPOT_PRIVATE_APP_TOKEN=your-private-app-token
CUSTOM_OBJECT_TYPE=p51490362_books
PORT=3000
```

Install dependencies:

```bash
npm install
```

Run the app:

```bash
node index.js
```

Open:

```text
http://localhost:3000
```