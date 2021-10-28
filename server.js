const express = require('express')
const helmet = require('helmet')
const app = express()

const path = __dirname + '/views/'

app.use(express.static(path));
app.use(helmet())

app.get('/', (req,res) => {
    res.sendFile(path + "index.html");
});

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});