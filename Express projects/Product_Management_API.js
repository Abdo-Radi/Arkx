const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const PORT = 3000;

// Dummy array of products
let products = [
  { id: 1, name: 'iPhone 12 Pro', price: 1099.99 },
  { id: 2, name: 'Samsung Galaxy S21', price: 999.99 },
  { id: 3, name: 'Sony PlayStation 5', price: 499.99 },
  { id: 4, name: 'MacBook Pro 16', price: 2399.99 },
  { id: 5, name: 'DJI Mavic Air 2', price: 799.99 },
];

// Middleware to parse JSON bodies
app.use(bodyParser.json());

// Route to get all products
app.get('/products', (req, res) => {
  res.json(products);
});

// Route to get details of a specific product by ID
app.get('/products/:id', (req, res) => {
  const productId = parseInt(req.params.id);
  const product = products.find(product => product.id === productId);
  if (!product) {
    res.status(404).json({ error: 'Product not found' });
  } else {
    res.json(product);
  }
});

// Route to search for products based on query parameters
app.get('/products/search', (req, res) => {
  const { q, minPrice, maxPrice } = req.query;
  let filteredProducts = products;

  if (q) {
    filteredProducts = filteredProducts.filter(product =>
      product.name.toLowerCase().includes(q.toLowerCase())
    );
  }

  if (minPrice) {
    filteredProducts = filteredProducts.filter(product =>
      product.price >= parseFloat(minPrice)
    );
  }

  if (maxPrice) {
    filteredProducts = filteredProducts.filter(product =>
      product.price <= parseFloat(maxPrice)
    );
  }

  res.json(filteredProducts);
});

// Route to create a new product
app.post('/products', (req, res) => {
  const newProduct = req.body;
  newProduct.id = products.length + 1;
  products.push(newProduct);
  res.status(201).json(newProduct);
});

// Route to update details of a specific product by ID
app.put('/products/:id', (req, res) => {
  const productId = parseInt(req.params.id);
  const updatedProduct = req.body;
  const index = products.findIndex(product => product.id === productId);

  if (index !== -1) {
    products[index] = { ...products[index], ...updatedProduct };
    res.json(products[index]);
  } else {
    res.status(404).json({ error: 'Product not found' });
  }
});

// Route to delete a specific product by ID
app.delete('/products/:id', (req, res) => {
  const productId = parseInt(req.params.id);
  const index = products.findIndex(product => product.id === productId);

  if (index !== -1) {
    products.splice(index, 1);
    res.sendStatus(204);
  } else {
    res.status(404).json({ error: 'Product not found' });
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});



