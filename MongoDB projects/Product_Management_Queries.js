const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/mydb2')
 .then(()=>{console.log('connected successfully!')})
 .catch((error)=>{console.log(error)})
//Define Product Schema
 const userSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true
 
    },
    price:{
        type: Number,
        required: true,
        min: 0
    },
    description:{type: String},
    inStock:{
        type: Boolean,
        default: true
    },
    createdAt:{ type: Date, default: Date.now()}
})
//Create a Mongoose Model
const ProductModel = mongoose.model('products',userSchema);

//Add this array of sample products to your database
const products = [
  {
    name: 'Laptop',
    price: 1200,
    description: 'High-performance laptop with powerful specs.',
    inStock: true,
    categories: ['Electronics', 'Computers']
  },
  {
    name: 'Smartphone',
    price: 800,
    description: 'Latest smartphone with advanced features.',
    inStock: true,
    categories: ['Electronics', 'Phones']
  },
  {
    name: 'Headphones',
    price: 150,
    description: 'Over-ear headphones with noise-cancelling technology.',
    inStock: true,
    categories: ['Electronics', 'Audio']
  },
  {
    name: 'Smartwatch',
    price: 250,
    description: 'Fitness tracker and smartwatch with health monitoring.',
    inStock: false,
    categories: ['Electronics', 'Wearable Tech']
  },
  {
    name: 'Camera',
    price: 600,
    description: 'Digital camera with high-resolution imaging.',
    inStock: true,
    categories: ['Electronics', 'Cameras']
  },
  {
    name: 'Gaming Console',
    price: 400,
    description: 'Next-gen gaming console for immersive gaming experiences.',
    inStock: true,
    categories: ['Electronics', 'Gaming']
  },
  {
    name: 'Bluetooth Speaker',
    price: 80,
    description: 'Portable Bluetooth speaker with crisp sound.',
    inStock: true,
    categories: ['Electronics', 'Audio']
  },
  {
    name: 'Tablet',
    price: 300,
    description: 'Slim and lightweight tablet for on-the-go productivity.',
    inStock: true,
    categories: ['Electronics', 'Computers']
  },
  {
    name: 'Coffee Maker',
    price: 50,
    description: 'Automatic coffee maker for brewing your favorite coffee.',
    inStock: true,
    categories: ['Appliances', 'Kitchen']
  },
  {
    name: 'Fitness Tracker',
    price: 100,
    description: 'Wearable fitness tracker with heart rate monitoring.',
    inStock: false,
    categories: ['Electronics', 'Wearable Tech']
  },
  {
    name: 'External Hard Drive',
    price: 120,
    description: 'Large-capacity external hard drive for data storage.',
    inStock: true,
    categories: ['Electronics', 'Computers', 'Storage']
  },
  {
    name: 'Wireless Mouse',
    price: 30,
    description: 'Ergonomic wireless mouse for comfortable computing.',
    inStock: true,
    categories: ['Electronics', 'Computers', 'Accessories']
  },
  {
    name: 'Portable Charger',
    price: 20,
    description: 'Compact portable charger for on-the-go device charging.',
    inStock: true,
    categories: ['Electronics', 'Accessories']
  },
  {
    name: 'Smart Bulbs',
    price: 15,
    description: 'Set of smart bulbs for customizable lighting at home.',
    inStock: true,
    categories: ['Electronics', 'Home Automation']
  },
  {
    name: 'Backpack',
    price: 40,
    description: 'Durable backpack with multiple compartments for storage.',
    inStock: true,
    categories: ['Fashion', 'Bags']
  },
  {
    name: 'Wireless Earbuds',
    price: 120,
    description: 'True wireless earbuds for immersive audio experiences.',
    inStock: false,
    categories: ['Electronics', 'Audio']
  },
  {
    name: 'Graphic Tablet',
    price: 200,
    description: 'Digital graphic tablet for artists and designers.',
    inStock: true,
    categories: ['Electronics', 'Art', 'Computers']
  },
  {
    name: 'Desk Chair',
    price: 150,
    description: 'Comfortable desk chair with adjustable features.',
    inStock: true,
    categories: ['Furniture', 'Office']
  },
  {
    name: 'Air Purifier',
    price: 80,
    description: 'HEPA air purifier for cleaner and fresher indoor air.',
    inStock: true,
    categories: ['Appliances', 'Home']
  },
  {
    name: 'Electric Toothbrush',
    price: 40,
    description: 'Electric toothbrush for effective dental care.',
    inStock: true,
    categories: ['Electronics', 'Personal Care']
  },
];

//Insert Sample Products
ProductModel.insertMany(products);
//Sort Products by Price 
ProductModel.find()
  .sort({price: -1})
  .then((products)=>{console.log(products)})
  .catch((error) => {
    console.log(`Error retrieving products: ${error}`)});
//Pagination - Limiting Results:
ProductModel.find()
  .limit(5)
  .then((products)=>{console.log(products)})
  .catch((error) => {
    console.log(`Error retrieving products: ${error}`)});
//Custom Pagination with Variables:
const pageSize = 2;
const pageNumber = 3;
ProductModel.find()
 .skip((pageNumber-1)*pageSize)
 .limit(pageSize)
 .then(users=>console.log(users))
 .catch(error=>console.log(error));

//Aggregation - Count Products in Stock:
ProductModel.aggregate([
  {
    $group:{
      _id: "$inStock",
      count: {$sum: 1},
  },
},
])
 .then((products)=>console.log(products));
//Aggregation - Calculate Average Price:
ProductModel.aggregate([
  {
    $group:{
      _id: "",
      count: {$avg:"$price"},
  },
},
])
 .then((products)=>console.log(products));
//Sorting Products by Name in Ascending Order:
ProductModel.find()
  .sort({name: 1})
  .then((products)=>{console.log(products)})
  .catch((error) => {
    console.log(`Error retrieving products: ${error}`)});
//Pagination - Dynamic Results with a Variable:
ProductModel.aggregate([
  {
    $group: {
      _id: "$category[0]",
      count: { $sum: 1 }
    }
  }
])
.then(products=>console.log(products))
.catch(error=>console.log(error));

//Product Management Queries II chalenge
// Update Product by Name
const updateProductPrice = async (productName, newPrice) => {
  try {
      const updatedProduct = await ProductModel.findOneAndUpdate(
          { name: productName },
          { price: newPrice },
          { new: true }
      );
      if (updatedProduct) {
          console.log("Updated product:", updatedProduct);
      } else {
          console.log("Product not found.");
      }
  } catch (error) {
      console.log("Error updating product:", error);
  }
};

// Soft Delete Products
const softDeleteProduct = async (productName) => {
  try {
      const softDeletedProduct = await ProductModel.findOneAndUpdate(
          { name: productName },
          { isDeleted: true },
          { new: true }
      );
      if (softDeletedProduct) {
          console.log("Soft deleted product:", softDeletedProduct);
      } else {
          console.log("Product not found.");
      }
  } catch (error) {
      console.log("Error soft deleting product:", error);
  }
};

// Hard Delete Expired Products
const hardDeleteExpiredProducts = async () => {
  try {
      const deletedProducts = await ProductModel.deleteMany({ expirationDate: { $lt: new Date() } });
      console.log("Number of hard-deleted products:", deletedProducts.deletedCount);
  } catch (error) {
      console.log("Error hard deleting products:", error);
  }
};

// Bulk Update Products
const bulkUpdateProductsDescription = async () => {
  try {
      const updatedProducts = await ProductModel.updateMany(
          { inStock: true },
          { description: "Updated description for in-stock products." }
      );
      console.log("Number of products updated:", updatedProducts.nModified);
  } catch (error) {
      console.log("Error bulk updating products:", error);
  }
};

// Bulk Delete Out-of-Stock Products
const bulkDeleteOutOfStockProducts = async () => {
  try {
      const deletedProducts = await ProductModel.deleteMany({ inStock: false });
      console.log("Number of products deleted:", deletedProducts.deletedCount);
  } catch (error) {
      console.log("Error bulk deleting products:", error);
  }
};