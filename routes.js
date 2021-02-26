"use strict";

//require the express module

const express = require("express");

//creates a new router object
const routes = express.Router();
const cartItems = [
  { id: 1, product: "Milk", price: 2.99, quantity: 20 },
  { id: 2, product: "Butter", price: 4.99, quantity: 15 },
  { id: 3, product: "Strawberries", price: 3.99, quantity: 30 },
  { id: 4, product: "Oeros", price: 4.5, quantity: 25 },
];

let nextId = 5;

routes.get("/cart-items", (req, res) => {
  let maxPrice = req.query.maxPrice;
  let filteredItems = cartItems;
  let prefix = req.query.prefix;
  let pageSize = req.query.pageSize;
  if (maxPrice) {
    filteredItems = filteredItems.filter((item) => {
      return item.price <= maxPrice;
    });
  }
  if (prefix) {
    filteredItems = filteredItems.filter((item) => {
      return item.product.toLowerCase().includes(prefix.toLowerCase().trim());
    });
  }
  if (pageSize) {
    filteredItems = filteredItems.slice(0, pageSize);
  }
  console.log(filteredItems);
  res.json(filteredItems);
});

routes.get("/cart-items/:id", (req, res) => {
  let id = parseInt(req.params.id);
  let foundItem = cartItems.find((item) => {
    return item.id === id;
  });
  if (foundItem) {
    res.status(200);
    res.json(foundItem);
  } else {
    res.status(404);
    res.send(`No item found with id: ${id}`);
  }
});

routes.post("/cart-items", (req, res) => {
  let item = req.body;
  item.id = nextId++;
  cartItems.push(item);
  res.status(201);
  res.json(item);
});

routes.put("/cart-items/:id", (req, res) => {
  let id = parseInt(req.params.id);
  let updatedItem = req.body;
  updatedItem.id = id;
  let index = cartItems.findIndex((item) => {
    return item.id === id;
  });

  if (index === -1) {
    res.status(404);
    res.send(`No item found with id: ${id}`);
  } else {
    cartItems[index] = updatedItem;
    res.send(updatedItem);
  }
});

routes.delete("/cart-items/:id", (req, res) => {
  let id = parseInt(req.params.id);
  let index = cartItems.findIndex((item) => {
    return item.id === id;
  });
  if (index === -1) {
    res.status(404);
    res.send(`No item found with id: ${id}`);
  } else {
    cartItems.splice(index, 1);
    res.sendStatus(204);
  }
});

module.exports = routes;
