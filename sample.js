const express = require('express');
const app = express();

var bakery = require('.');
var opts = {
  queryParam: 'bake', // default
  whitelist: ['feature_flag1', 'feature_flag2'],
};

app.use(bakery(opts))
  .get('*', (req, res) => res.sendStatus(201))
  .listen(3000);
