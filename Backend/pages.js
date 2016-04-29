exports.mainPage = function(req, res) {
    res.render('mainPage', { //mainPage.ejs - уде відображуватися ( пишеться назва ejs файлу
        pageTitle: 'Fish'
    });
};

//exports.test = function(req, res) {
//    res.render('test', { //mainPage.ejs - уде відображуватися ( пишеться назва ejs файлу
//        pageTitle: 'Weather'
//    });
//};