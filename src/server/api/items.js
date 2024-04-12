const express = require("express");
const itemsRouter = express.Router();

const { 
  getAllItems, 
  getItemByName, 
  getItemById,
  createItem, 
} = require("../db/items");

// Route to get all items
itemsRouter.get("/", async (req, res, next) => {
  try {
    const { name } = req.query;
    if (name) {
      const item = await getItemByName(name)
      if(!item) {
        res.status(404).send('Item not found');
      } else {
        res.send(item);
      }
    } else {
    const allItems = await getAllItems();
    res.send(allItems);
    }
  } catch (error) {
    next(error);
  }
});

// Route to get added item
itemsRouter.post("/additem", async (req, res, next) => {
  try {
    const {name, brand, category, description, picture} =req.body;
    const addedItem = await createItem({name, brand, category, description, picture});
    res.status(201).json(addedItem);
  } catch (error) {
    next(error);
  }
});

// Route to get item by ID
itemsRouter.get("/:id", async (req, res, next) => {
  try {
    const id = req.params.id;
    const item = await getItemById(id);
    if (!item) {
      res.status(404).send("Item not found");
    } else {
      res.send(item);
    }
  } catch (error) {
    next(error);
  }
});

// Route to get item by name
itemsRouter.get("/name/:name", async (req, res, next) => {
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

itemsRouter.get('/category/:category', async (req,res,next) => {
  try {
    const category = req.params.category;
    const items = await getItemsByCategory(category);
    res.send(items);
  } catch (error) {
    next(error);
  }
});

module.exports = itemsRouter;
