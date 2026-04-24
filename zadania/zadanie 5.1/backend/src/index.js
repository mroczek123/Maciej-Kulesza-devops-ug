const fs = require('fs');
const express = require('express');
const app = express();
const port = process.env.PORT;

app.use(express.json());

function readProducts() {
  return fs.existsSync("/data/items.json") ? JSON.parse(fs.readFileSync("/data/items.json", 'utf8')) : [];
}
function writeProduct() {
  fs.writeFileSync("/data/items.json", JSON.stringify(items));
}

app.get('/', (req, res) => {
  res.send('Hello World!')
});

app.get('/items', (req, res) => {
  const products = readProducts();
  res.send(products);
});

app.post('/items', async (req, res, next) => {
  const receivedJson = req.body;
  console.log(req);

  const newItem = {
    id: Math.floor(Math.random() * 100),
    name: receivedJson.name
  };

  const items = readProducts();
  items.push(newItem);
  fs.writeFileSync("/data/items.json", JSON.stringify(items));
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