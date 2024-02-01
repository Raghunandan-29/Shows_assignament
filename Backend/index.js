const express = require('express');
const axios = require('axios');
const cors = require('cors');

const app = express();
const port = 9000;

app.use(cors());

app.get('/getshows', async (req, res) => {
  const apiUrl = 'https://api.tvmaze.com/search/shows?q=all';

  try {
    const response = await axios.get(apiUrl);
    const shows = response.data;

    // Send the shows data as a response to the frontend
    res.json(shows);
  } catch (error) {
    console.error('Error fetching data from the API:', error.message);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});
app.get('/getshow/:id', async (req, res) => {
  const id = req.params.id;
  const apiUrl = `https://api.tvmaze.com/shows/${id}`;

  try {
    const response = await axios.get(apiUrl);
    const shows = response.data;

    // Send the shows data as a response to the frontend
    res.json(shows);
  } catch (error) {
    console.error('Error fetching data from the API:', error.message);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});
app.get('/getshow/previous/:id', async (req, res) => {
  const id = req.params.id;
  const apiUrl = `https://api.tvmaze.com/episodes/${id}`;

  try {
    const response = await axios.get(apiUrl);
    const shows = response.data;

    // Send the shows data as a response to the frontend
    res.json(shows);
  } catch (error) {
    console.error('Error fetching data from the API:', error.message);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});


app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
