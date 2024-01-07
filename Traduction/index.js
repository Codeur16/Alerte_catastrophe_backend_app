var express = require('express');
var app = express();
app.get('/', function (req, res) {
res.send("Welocme to traduction service!");
});
app.listen(3002);