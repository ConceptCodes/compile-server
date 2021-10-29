const router = require('express').Router()
const axios = require('axios').default
require('dotenv').config()

router.post('/', (req, res) => {
    const options = {
        method: 'POST',
        url: 'https://rewriter-paraphraser-text-changer-multi-language.p.rapidapi.com/rewrite',
        headers: {
          'content-type': 'application/json',
          'x-rapidapi-host': 'rewriter-paraphraser-text-changer-multi-language.p.rapidapi.com',
          'x-rapidapi-key': process.env.RAPID_API_KEY
        },
        data: {language: 'en', strength: req.body.strength, text: req.body.text}
      };
      
      axios.request(options).then((response) => {
          res.json(response.data)
      }).catch((error) => {
          console.error(error);
      });
})

module.exports = router