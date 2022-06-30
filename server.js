var express = require('express')
var cors = require('cors')
var app = express()

app.use(cors())

app.get('/case-subtypes', function (req, res, next) {
  res.json([
    { raw: "post_a_payment", display: "Post a Payment" },
    { raw: "fee_waivers", display: "Fee Waivers" },
    { raw: "other", display: "Other" },
  ])
})

app.listen(5001)
