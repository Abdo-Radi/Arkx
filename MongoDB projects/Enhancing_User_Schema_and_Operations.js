const mongoose = require('mongoose');
mongoose
.connect('mongodb://localhost:27017/mydb')
.then(()=>{console.log('Connecting to database')})
.catch((error)=>console.log('Error: ',error));

//Create User Schema
const userSchema = new mongoose.Schema({
    name :{type : String, required : true},
    email : {type : String, required : true , unique : true},
    age: {type : Number},
    timestamp: { type: Date, default: Date.now()}
});
const User = mongoose.model('User', userSchema);
//Create a New User
const newUser = User.create({
name: "Mike Ross",
email: "mike.ross@arkx.group",
age: 30
});
//Fetch Users with Pagination:
User.findOne({ name: "Mike Ross",
email: "mike.ross@arkx.group" })
  .then((user) => {
    if (user) console.log(user);
    else console.log("User not found");
  })
  .catch((error) => console.log("Error fetching users: ", error));

//Update User Email
User.findOneAndUpdate(
    { email: "mike.ross@arkx.group" },
    { $set: { email: "saad.amine@arkx.group" } }
  )
    .then((user) => {
      if (user) console.log("User updated successfully: ", user);
      else console.log("User not found");
    })
    .catch((error) => console.log("Error fetching users: ", error));
//Delete Users Created Before a Certain Date
User.findOneAndDelete({})
  .then((user) => {
    if (user) console.log("User deleted successfully: ", user);
    else console.log("User not found");
  })
  .catch((error) => console.log("Error deleting user: ", error));
//Delete Users Created Before a Certain Date
const currentDate = new Date();
const limitDate = currentDate - (8,64e7*7);
User.deleteMany({ createdAt: { $lt: limitDate } }) .then((user) => {
    if (user) console.log("User deleted successfully: ", user);
    else console.log("User not found");
  })
  .catch((error) => console.log("Error deleting user: ", error));
  