const express = require('express');
const app = express();
const port = 3000;
// Custom logging middleware
app.use((req, res, next) => {
    // Get current date and time
    const dateTime = new Date().toISOString();

    // Log request information
    console.log(`${dateTime} - ${req.method} ${req.url}`);

    // Call the next middleware in the stack
    next();
});


app.get('/', (req, res) => {
    res.send('Hello World!');
});
app.post('/submit',(req,res)=>{
    res.send('Data submitted successfully')
})
const errorHandlerMiddleware = (err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send("Oops! Something went wrong.");
  };

// Start the server

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
