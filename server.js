const express = require('express')
const helmet = require('helmet')
const rateLimit = require('express-rate-limit')
const bodyParser = require('body-parser')
const expressSanitizer = require('express-sanitizer')
const morgan = require('morgan')

const app = express()

const views_dir = __dirname + '/views/'
const api = require('./routes')

app.use(express.static(views_dir));

app.use(rateLimit({
  windowMs: 10 * 60 * 1000, // 10 Mins
  max: 100,
}))
app.set('trust proxy', 1)

app.use(helmet.frameguard({ action: 'SAMEORIGIN' }));
app.use(morgan('dev'))
app.use(bodyParser.json());
app.use(expressSanitizer())
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/api', api)

app.get('/', (req,res) => {
    res.sendFile(views_dir + "index.html");
});

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});