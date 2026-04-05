const express = require('express');
const app = express();
const port = 3000;

app.use(express.json());

const products = [
  {
    id: 1,
    name: "Product A",
  },
  {
    id: 2,
    name: "Product B",
  }
];

app.get('/', (req, res) => {
  res.send('Hello World!')
});

app.get('/items', (req, res) => {
  res.send(products);
});

app.post('/items', (req, res, next) => {
  const receivedJson = req.body;
  console.log(req);

  const newItem = {
    id: Math.floor(Math.random() * 100),
    name: receivedJson.name
  }
  products.push(newItem);
  res.status(201).send("");
  next();
})

app.get('/stats', (req, res) => {
  res.send({
    "productsAmount": products.length,
    "instanceId": process.env.INSTANCE_ID
  });
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})