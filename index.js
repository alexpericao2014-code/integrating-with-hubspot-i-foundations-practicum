const express = require('express');
const axios = require('axios');
require('dotenv').config();

const app = express();

const PORT = process.env.PORT || 3000;
const HUBSPOT_TOKEN = process.env.HUBSPOT_PRIVATE_APP_TOKEN;
const CUSTOM_OBJECT_TYPE = process.env.CUSTOM_OBJECT_TYPE;

app.set('view engine', 'pug');

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static('public'));

const hubspotHeaders = {
  Authorization: `Bearer ${HUBSPOT_TOKEN}`,
  'Content-Type': 'application/json'
};

app.get('/', async (req, res) => {
  try {
    const response = await axios.get(
      `https://api.hubapi.com/crm/v3/objects/${CUSTOM_OBJECT_TYPE}?properties=name,author,genre`,
      {
        headers: hubspotHeaders
      }
    );

    res.render('homepage', {
      title: 'Books Custom Object Records',
      books: response.data.results
    });
  } catch (error) {
    console.error(error.response?.data || error.message);
    res.status(500).send('Error loading custom object records.');
  }
});

app.get('/update-cobj', (req, res) => {
  res.render('updates', {
    title: 'Add a Book'
  });
});

app.post('/update-cobj', async (req, res) => {
  try {
    const { name, author, genre } = req.body;

    await axios.post(
      `https://api.hubapi.com/crm/v3/objects/${CUSTOM_OBJECT_TYPE}`,
      {
        properties: {
          name,
          author,
          genre
        }
      },
      {
        headers: hubspotHeaders
      }
    );

    res.redirect('/');
  } catch (error) {
    console.error(error.response?.data || error.message);
    res.status(500).send('Error creating custom object record.');
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});