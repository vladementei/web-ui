const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");


const app = express();
const port = process.env.PORT || 3000;

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET,POST,DELETE');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested With, Content-Type, Accept');
  next();
});


app.use((req, res, next) => {
  if (path.extname(req.path).length > 0) {
    next();
  } else {
    res.sendFile(path.resolve(`${__dirname}/dist/web-ui/index.html`));
  }
});

app.use('/', express.static(`${__dirname}/dist`));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));


app.listen(port, () => {
  console.log(`⚡️[server]: UI server is running at port:${port}`);
});
