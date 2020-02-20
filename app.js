const express = require('express');
const app = express();

app.use(express.json());

const cart = [
    { 
        id: 1,
        product: 'cereal',
        price: 3.50,
        quantity: 2
    },
    { 
        id: 2,
        product: 'yoghurt',
        price: 3.50,
        quantity: 4
    },
    { 
        id: 3,
        product: 'avocado',
        price: .75,
        quantity: 3
    }
]

app.get('/', (req, res) => {
    res.send('Hello World');
});

app.get('/api/cart-items', (req, res) => {
    res.send(cart);
})

app.get('/api/cart-items/:id', (req, res) => {
    const trolley = cart.find(shop => shop.id === parseInt(req.params.id));
    if (!trolley) res.status(404).send('The course with the given ID was not found');
    res.send(trolley);
});

app.post('/api/cart-items', (req, res) => {
    const newItem = {
        id: cart.length + 1,
        product: req.body.product,
        price: req.body.price,
        quantity: req.body.quantity
    };
    res.status(201);
    cart.push(newItem);
    res.send(newItem);
});

app.put('/api/cart-items/:id', (req, res) => {
    const trolley = cart.find(shop => shop.id === parseInt(req.params.id));
    if (!trolley) res.status(404).send('The course with the given ID was not found');

    cart.product = req.body.product;
    cart.price = req.body.price,
    cart.quantity = req.body.quantity;
    res.status(201).send(cart);
})

app.delete('/api/cart-items/:id', (req, res) => {
    const trolley = cart.find(shop => shop.id === parseInt(req.params.id));
    if (!trolley) res.status(404).send();

    const index = cart.indexOf(trolley);
    res.status(204);
    cart.splice(index, 1);
    res.end();
})



// PORT
const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`listening on port ${port}`));


