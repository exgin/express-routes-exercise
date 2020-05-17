const express = require('express');
const router = new express.Router();
const ExpressError = require('../expressError');
const itemsDb = require('../fakeDb');

data = [
  { name: 'popsicle', price: 1.45 },
  { name: 'cheerios', price: 3.4 },
];
itemsDb.push(data);

router.get('/', function (req, res) {
  res.json({ itemsDb });
});

router.get('/:name', function (req, res) {
  const item = itemsDb.find((item) => item.name === req.params.name);
  if (item === undefined) {
    throw new ExpressError('Item not found', 404);
  }
  res.json({ item });
});

router.post('/', function (req, res) {
  const newItem = { name: req.body.name, price: req.body.price };
  itemsDb.push(newItem);
  res.status(201).json({ added: newItem });
});

// router.patch('/:name', function (req, res) {
//   const itemUpdated = itemsDb.find((item) => item.name === req.params.name);
//   if (item === undefined) {
//     throw new ExpressError('Item not found', 404);
//   }
//   res.json({ updated: itemUpdated });
// });

module.exports = router;
