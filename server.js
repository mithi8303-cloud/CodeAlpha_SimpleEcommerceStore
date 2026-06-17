const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

let users = [];

let products = [
  {
    id: 1,
    name: "Smart Watch",
    price: 1999
  },
  {
    id: 2,
    name: "Headphones",
    price: 1499
  },
  {
    id: 3,
    name: "Laptop Bag",
    price: 999
  }
];

let cart = [];

// Home Route
app.get("/", (req, res) => {
    res.send("CodeAlpha E-Commerce Backend Running");
});

// Register API
app.post("/register", (req, res) => {
    const { username, password } = req.body;

    const userExists = users.find(user => user.username === username);

    if (userExists) {
        return res.json({ message: "User already exists" });
    }

    users.push({ username, password });

    res.json({
        message: "Registration Successful",
        users
    });
});

// Login API
app.post("/login", (req, res) => {
    const { username, password } = req.body;

    const user = users.find(
        user => user.username === username &&
        user.password === password
    );

    if (user) {
        res.json({ message: "Login Successful" });
    } else {
        res.json({ message: "Invalid Username or Password" });
    }
});

app.get("/products", (req, res) => {
    res.json(products);
});

// Add To Cart API
app.post("/cart", (req, res) => {

    const { productId } = req.body;

    const product = products.find(
        p => p.id === productId
    );

    if (!product) {
        return res.json({
            message: "Product not found"
        });
    }

    cart.push(product);

    res.json({
        message: "Product added to cart",
        cart
    });
});

app.get("/cart", (req, res) => {
    res.json(cart);
});

// Remove From Cart API
app.delete("/cart/:id", (req, res) => {

    const productId = parseInt(req.params.id);

    cart = cart.filter(item => item.id !== productId);

    res.json({
        message: "Product removed from cart",
        cart
    });
});

let orders = [];

// Checkout API
app.post("/checkout", (req, res) => {

    if (cart.length === 0) {
        return res.json({
            message: "Cart is empty"
        });
    }

    const order = {
        orderId: orders.length + 1,
        items: [...cart]
    };

    orders.push(order);

    cart = [];

    res.json({
        message: "Order placed successfully",
        order
    });
});

// Get All Orders
app.get("/orders", (req, res) => {
    res.json(orders);
});


app.listen(5000, () => {
    console.log("Server running on port 5000");
});