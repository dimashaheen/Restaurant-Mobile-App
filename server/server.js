const express = require('express');
const app  = express();
const items = require('./items.json');

app.get('/items', function(req, res) {
  return res.send(items);
});

app.get('/items/:category', function(req, res) {
  const { category } = req.params;
  return res.send(items[category.toUpperCase()]);
});

app.listen(3000, function() {
  console.log("[OK] = HTTP Server listening on: http://localhost:3000");
});
