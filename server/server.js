const express = require('express');
const app  = express();
const items = require('./items.json');
const itemsCopy = require('./itemsCopy.json');

app.get('/items', function(req, res) {
  return res.send(items);
});

// app.get('/itemsCopy', function(req, res) {
//   return res.send(itemsCopy);
// });

app.get('/items/:category', function(req, res) {
  const { category } = req.params;
  return res.send(items[category]);
});

app.get('/itemsCopy/:category', function(req, res) {
  const { category } = req.params;
  return res.send(itemsCopy[category]);
});

app.listen(3000, function() {
  console.log("[OK] = HTTP Server listening on: http://192.168.1.11:3000");
});
