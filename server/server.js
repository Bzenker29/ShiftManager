const express = require('express');
const app = express();
const port = 8383;

app.use(express.static('public')); 

app.use(express.json());

app.get('/message', (req, res) => {
  res.json({ message: 'Hello, World!' });
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});