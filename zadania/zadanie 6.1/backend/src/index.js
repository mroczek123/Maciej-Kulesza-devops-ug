const pg = require('pg');
const express = require('express');
const app = express();
const port = process.env.PORT;

app.use(express.json());

const client = await new pg.Client().connect();

async function readProducts() {
  const res = await client.query('SELECT name, price FROM products');
  return []
}

async function writeProduct(newItem) {
  const text = 'INSERT INTO products(name, price) VALUES($1, $2) RETURNING *';
  values = [newItem.name, newItem.price];
  client.query(text, values);
  fs.writeFileSync("/data/items.json", JSON.stringify(items));
}

app.get('/', (req, res) => {
  res.send('Hello World!')
});

app.get('/items', async (req, res) => {
  const products = readProducts();
  res.send(products);
});

app.post('/items', async (req, res, next) => {
  const receivedJson = req.body;
  console.log(req);

  const newItem = {
    name: receivedJson.name,
    price: receivedJson.price,
  };

  writeProduct(newItem);
  res.status(201).send("");
  next();
})

app.get('/stats', (req, res) => {
  res.send({
    "productsAmount": readProducts().length,
    "instanceId": process.env.INSTANCE_ID
  });
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})