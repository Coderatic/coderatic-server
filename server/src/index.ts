import Express from 'express';

const app = Express();

app.get('/', (req, res) => {
  res.send('Hello, World!');
});

const PORT = 3000
app.listen(PORT, () => {
  console.log(`Server is up and running at http://localhost:${PORT}.`);
});
