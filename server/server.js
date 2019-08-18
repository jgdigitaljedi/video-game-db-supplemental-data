const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const chalk = require('chalk');
const port = 4001;
const cors = require('cors');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());

app.use('/igdb', require('./igdb.controller'));
app.use('/gb', require('./gb.controller'));
app.use('/tgdb', require('./tgdb.controller'));
app.use('/files', require('./files.controller'));

// catch 404 and forward to error handler
app.use((req, res) => {
  const err = new Error('Not Found');
  err.status = 404;
  console.log(chalk.red.bold('ERROR:', err));
  res.status(404).json({ error: true, message: `${req.method}: ${req.url} is not a known route!` });
  // next(err);
});

app.listen(port, () => console.log(chalk.cyan(`app listening on port ${port}!`)));
