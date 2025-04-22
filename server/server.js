const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const MakeupModel = require('./models/makeup'); // adjust if your path is different

const app = express();
const PORT = 3002;

// Middleware
app.use(cors());
app.use(express.json());

// Connect to MongoDB
mongoose.connect('mongodb://127.0.0.1:27017/makeupDB', {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log(' Connected to MongoDB'))
.catch(err => console.error(' MongoDB connection error:', err));

// API endpoint to return all products
// app.get('/products', async (req, res) => {
//   try {
//     const products = await MakeupModel.find(); // return all products
//     res.json(products);
//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }
// });
// app.get('/products', async (req, res) => {
//   try {
//     console.log("🔍 Attempting to fetch products...");

//     const products = await MakeupModel.find();
//     console.log("✅ Products fetched:", products);

//     res.json(products);
//   } catch (err) {
//     console.error("❌ Error in /products route:", err);  // 🛑 THIS will catch the 500 error cause
//     res.status(500).json({ error: err.message });
//   }
// });
app.get('/products', (req, res) => {
  console.log("🔧 Sending mock product data...");

  const mockProducts = [
    {
      id: 1,
      brand: "nars",
      name: "Velvet Matte Lipstick",
      price: 24.99,
      description: "A creamy matte lipstick for bold looks.",
      product_type: "lipstick",
      api_featured_image: "https://cdn.shopify.com/s/files/1/0248/3473/6191/products/NARS-Lipstick.jpg"
    },
    {
      id: 2,
      brand: "mac",
      name: "Blush Baby",
      price: 18.00,
      description: "Powder blush with a soft pink finish.",
      product_type: "blush",
      api_featured_image: "https://cdn.shopify.com/s/files/1/0248/3473/6191/products/MAC-Blush.jpg"
    },
    {
      id: 3,
      brand: "nyx",
      name: "Total Control Foundation",
      price: 12.50,
      description: "Customizable coverage with a dropper.",
      product_type: "foundation",
      api_featured_image: "https://cdn.shopify.com/s/files/1/0248/3473/6191/products/NYX-Foundation.jpg"
    },
    {
      id: 4,
      brand: "colourpop",
      name: "ColourPop Mascara",
      price: 10.00,
      description: "Adds bold volume and definition.",
      product_type: "mascara",
      api_featured_image: "https://cdn.shopify.com/s/files/1/0248/3473/6191/products/Colourpop-Mascara.jpg"
    }
  ];

  res.json(mockProducts);
});


// Start the server
app.listen(PORT, () => {
  console.log(` Server is running at http://localhost:${PORT}`);
});
