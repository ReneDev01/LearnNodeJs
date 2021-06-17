let app = require('express')()

app.set('view engine', 'ejs');

app.get('/', (req, res)=>{
    res.render('pages/index', {test : 'salut'});
});

app.listen(8080);