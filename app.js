const express = require('express');
const mongoose = require('mongoose');
const exphbs = require('express-handlebars');
const productRoutes = require('./Routes/ProductRoutes');

const app = express();

// Connect to MongoDB
mongoose
  .connect('mongodb+srv://cuong:12345678a@atlascluster.43xuzhs.mongodb.net/ProductDB2?retryWrites=true&w=majority', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch((err) => {
    console.error('Error connecting to MongoDB:', err);
  });

// Set view engine
app.set('view engine', 'hbs');

// Parse form data
app.use(express.urlencoded({ extended: true }));

// Use productRoutes in the application
app.use('/ProductModel', productRoutes);

// Define routes for your different views
app.get('/Index', (req, res) => {
  res.render('Index'); 
});

app.get('/CSS/styles.css',(req,res)=>{
  const filePath = __dirname +'/Public/CSS/styles.css'
  res.sendFile(filePath);
})

app.get('/AddProduct', (req, res) => {
  res.render('AddProduct');
});

app.get('/EditProduct', (req, res) => {
  res.render('EditProduct');
});

// Handle 404 Not Found
app.use((req, res) => {
  res.status(404).render('404');
});

// Rest of your code (post routes and server start)

// Start the server
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
