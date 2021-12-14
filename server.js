const express = require('express')
const helmet = require('helmet')
const bodyParser = require('body-parser')
const expressSanitizer = require('express-sanitizer')
const history = require('connect-history-api-fallback')
const morgan = require('morgan')
const path = require('path')

const app = express()

const views_dir = path.join(__dirname, 'views')

app.use(express.static(views_dir));

app.use(helmet());
app.use(morgan('dev'))
app.use(bodyParser.json());
app.use(expressSanitizer())
app.use(bodyParser.urlencoded({ extended: true }));

app.use(history({
  verbose: true
}));
app.get('*', function(req, res) {  
  res.redirect('https://' + req.headers.host + req.url);
})
app.use('/', express.static(views_dir));

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});