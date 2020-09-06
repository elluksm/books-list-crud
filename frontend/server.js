var express = require("express");
var app = express();

app.use(express.static(__dirname));

/* final catch-all route to index.html defined last */
app.get("/*", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});

app.listen("3003");
console.log("working on 3003");
