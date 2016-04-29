var fs = require('fs');
var ejs = require('ejs');


exports.Table = ejs.compile(fs.readFileSync('./Backend/views/table.ejs', "utf8"));