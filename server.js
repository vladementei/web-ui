const express = require("express");
const bodyParser = require ("body-parser");


const port = process.env.PORT || 3000;
const app = express();
app.use(bodyParser.json())

app.get("/", (req, res) => res.send("Welcome to web ui"));

app.listen(port, () => {
  console.log(`⚡️[server]: UI server is running at port:${port}`);
});
