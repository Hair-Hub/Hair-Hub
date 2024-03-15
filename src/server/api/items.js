const express = require("express");
const itemsRouter = express.Router();

const { getAllItems, getItemByName } = require("../db/items");

// Route to get all items
itemsRouter.get("/", async (req, res, next) => {
  try {
    const allItems = await getAllItems();
    res.send(allItems);
  } catch (error) {
    next(error);
  }
});

// Route to get item by name
itemsRouter.get("/:name", async (req, res, next) => {
  try {
    const name = req.params.name;
    const item = await getItemByName(name);
    if (!item) {
      res.status(404).send("Item not found");
    } else {
      res.send(item);
    }
  } catch (error) {
    next(error);
  }
});

module.exports = itemsRouter;
