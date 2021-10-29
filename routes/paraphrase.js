const router = require("express").Router();
const axios = require("axios").default;
require("dotenv").config();

router.post("/", (req, res) => {
  let article = req.body.article.match(/\(?[^\.\?\!]+[\.!\?]\)?/g)
  let _article = []
  let _strength = req.body.strength

  article.forEach(sentence => {
    const options = {
      method: "POST",
      url:
      "https://rewriter-paraphraser-text-changer-multi-language.p.rapidapi.com/rewrite",
      headers: {
        "content-type": "application/json",
        "x-rapidapi-host":
        "rewriter-paraphraser-text-changer-multi-language.p.rapidapi.com",
        "x-rapidapi-key": process.env.RAPID_API_KEY,
      },
      data: { language: "en", strength: _strength, text: sentence },
    };
    
    axios
    .request(options)
    .then(async(response) =>  {
      const data = await response.data
      console.log(data)
    })
    .catch((error) => { console.error(error) });
  });
 
  
  // calcualte score
  // let _similarity = parseFloat(
  //     _article
  //       .map((li) => li.similarity)
  //       .reduce((sum, val) => sum + val, 0) / _article.length
  //   ).toFixed(2);

    // convert back to string

    // let _content = _article.map(x => x.rewrite)
    console.log(_article)
    
    res.status(200).json({ content: '', similarity: 0 });
});

module.exports = router;
