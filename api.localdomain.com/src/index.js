const express = require('express');
const cookieParser = require('cookie-parser')
const PORT = 3002;
const app = express();
app.use(cookieParser())

/**
 * 
 */
app.get('/', (req, res) => {
  const query = Object.keys(req.query);
  res.cookie(query?.[0] ?? 'Unknown', req?.query[query?.[0]] ?? 'Unknown', { domain: 'localdomain.com', path: '/', secure: true });

  res.json({ query: {
    [query?.[0] ?? 'Unknown']: req?.query[query?.[0]] ?? 'Unknown'
  }});
});

/**
 * 
 */
app.get('/:domain/signin', (req, res) => {
  const query = Object.keys(req.query);

  res.cookie(query?.[0] ?? 'Unknown', req?.query[query?.[0]] ?? 'Unknown', { domain: 'localdomain.com', path: '/', secure: true });

  res.json({ query: {
    [query?.[0] ?? 'Unknown']: req?.query[query?.[0]] ?? 'Unknown'
  }});
});

app.listen(PORT, () => console.log(`Listening on ${PORT}`));