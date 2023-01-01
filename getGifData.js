const axios = require('axios');
require('dotenv').config();

const BASE_URL =(q) => `https://api.giphy.com/v1/gifs/search?api_key=${process.env.GIF_API_KEY}&q=${q}&limit=10&offset=0&rating=g&lang=en`;

module.exports = async q => {
    try {
        return axios.get(BASE_URL(q))
    } catch (e) {
        console.log(e);
    }

}