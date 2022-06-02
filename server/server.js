const express = require('express');
const app  = express();
const items = require('./items.json');
const itemsCopy = require('./itemsCopy.json');
// const cart = require('./cart.json');

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

// app.post('/cart', function (req, res) {
//   var item = req.body.items;
//   cart.push(item);

//   return res.send('Item has been added successfully');
// });

app.listen(3000, function() {
  console.log("[OK] = HTTP Server listening on: http://192.168.1.5:3000");
});
