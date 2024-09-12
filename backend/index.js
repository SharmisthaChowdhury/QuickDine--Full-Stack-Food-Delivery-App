import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import bodyParser from "body-parser";
import route from "./routes/userRoutes.js";
import cors from "cors";
import multer from "multer";
import path from "path";
import foodItem from "./model/foodItem.js";

const app = express();
dotenv.config();

// Middleware setup
app.use(bodyParser.json());
app.use(express.json());
app.use(cors({
    origin: "http://localhost:3000",
}));

// API to add food items
app.post('/addfooditem', async (req, res) => {
  try {
      let products = await foodItem.find({});
      let id;
      if (products.length > 0) {
          let last_product_array = products.slice(-1);
          let last_product = last_product_array[0];
          id = last_product.id + 1;
      } else {
          id = 1;
      }
      const product = new foodItem({
          id: id,
          name: req.body.name,
          price: req.body.price,
          image: req.body.image,
          category: req.body.category,
          description: req.body.description,
          restaurantname: req.body.restaurantname,
      });
      await product.save();
      res.json({
          success: true,
          name: req.body.name,
      });
  } catch (error) {
      console.error("Error adding product:", error);
      res.status(500).json({
          success: false,
          message: "Failed to add product",
      });
  }
});

// API to upload images
const storage = multer.diskStorage({
    destination: './Upload/images',
    filename: (req, file, cb) => {
        cb(null, `${file.fieldname}_${Date.now()}${path.extname(file.originalname)}`);
    }
});
const upload = multer({ storage: storage });
app.use('/images', express.static('Upload/images'));
app.post("/upload", upload.single('product'), (req, res) => {
    res.json({
        success: 1,
        image_url: `http://localhost:${PORT}/images/${req.file.filename}`
    });
});

// API to search food items by name
app.get('/search', async (req, res) => {
    try {
        const { name } = req.query;
        if (!name) {
            return res.status(400).json({ success: false, message: "Search term is required" });
        }

        // Search for food items by name and get distinct restaurant names
        const results = await foodItem.find({
            name: { $regex: name, $options: 'i' } // Case-insensitive search
        }).distinct('restaurantname'); // Get distinct restaurant names

        res.json(results);
    } catch (error) {
        console.error("Error searching for food items:", error);
        res.status(500).json({ success: false, message: "Failed to search for food items" });
    }
});


app.use("/api/user", route);

const PORT = process.env.PORT || 7000;
const MONGOURL = process.env.MONGO_URL;
mongoose.connect(MONGOURL).then(() => {
    console.log("Database is connected");
    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
    });
}).catch((error) => console.log(error));
