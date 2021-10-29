const paraphrase = require('./paraphrase')
const router = require('express').Router()

router.use('/paraphrase', paraphrase)

module.exports = router