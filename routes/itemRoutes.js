const express = require('express');
const router = new express.Router();
const ExpressError = require('../expressError');
const itemsDb = require('../fakeDb');

itemsDb.push({ name: 'popsicle', price: 1.45 }, { name: 'cheerios', price: 3.4 });

router.get('/', function (req, res, next) {
  try {
    return res.json({ itemsDb });
  } catch (error) {
    return next(error);
  }
});

router.get('/:name', function (req, res, next) {
  try {
    const item = itemsDb.find((item) => item.name === req.params.name);
    if (item === undefined) {
      throw new ExpressError('Item not found', 404);
    }
    return res.json({ item });
  } catch (error) {
    return next(error);
  }
});

router.post('/', function (req, res, next) {
  try {
    const newItem = { name: req.body.name, price: req.body.price };
    itemsDb.push(newItem);
    return res.status(201).json({ added: newItem });
  } catch (error) {
    return next(error);
  }
});

router.patch('/:name', function (req, res, next) {
  try {
    const itemUpdated = itemsDb.find((item) => item.name === req.params.name);
    if (item === undefined) {
      throw new ExpressError('Item not found', 404);
    }
    return res.json({ updated: itemUpdated });
  } catch (error) {
    return next(error);
  }
});

router.delete('/:name', function (req, res, next) {
  try {
    const item = itemsDb.findIndex((item) => (item.name = req.params.name));
    if (item === -1) {
      throw new ExpressError('Item not found', 400);
    }
    itemsDb.splice(item, 1);
    return res.json({ message: 'Deleted' });
  } catch (error) {
    return next(error);
  }
});

module.exports = router;
