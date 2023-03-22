const express = require("express");
const router = express.Router();

const Food_Item = require("../models/food_item_model");
const mongoose = require("mongoose");


//create
router.post("/create-food-item", (req, res, next) => {
   const { name, available, price, image, description } = req.body;
   const r = new Food_Item(
      {
         _id: new mongoose.Types.ObjectId(),
         description,
         name,
         price,
         available,
         image,
      }
   );
   return r
      .save()
      .then((Food_Item) => res.status(200).json({ Food_Item }))
      .catch((error) => res.status(500).json({ error }));
})

//read
router.get("/", (req, res, next) => {
   return Food_Item.find()
      .then(Food_Items => res.status(200).json({ Food_Item_count: Food_Items.length, Food_Items }))
      .catch(err => res.status(500).json({ message: `${err}` }))
})

//read one
router.get("/:id", (req, res, next) => {
   const __id = req.params.id;
   return Food_Item.findById(__id)
      .then((Food_Item) => {
         if (Food_Item) return res.status(200).json(Food_Item)
         else return res.status(404).json({ message: "Food_Item not found" })
      })
      .catch(err => res.status(500).json({ message: `${err}` }))
})

//update
router.put("/update-food-item/:id", (req, res, next) => {
   const __id = req.params.id;
   return Food_Item.findById(__id)
      .then((Food_Item) => {
         if (Food_Item) {
            Food_Item.set(req.body);
            return Food_Item
               .save()
               .then((Food_Item) => {
                  return res.status(200).json({ Food_Item });
               })
               .catch((err) => {
                  return res.status(500).json({ err });
               });
         } else {
            return res.status(404).send({ error: "Food_Item not found" });
         }
      })
      .catch((err) => {
         return res.status(500).json({ err });
      });
})

//delete
router.delete("/delete-food-item/:id", (req, res, next) => {
   const __id = req.params.id;
   return Food_Item.findByIdAndDelete(__id)
      .then(() => res.status(200).json({ success: true }))
      .catch((error) => res.status(500).json({ error }));
})

module.exports = router