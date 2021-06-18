<<<<<<< HEAD
let app = require('express')()

app.set('view engine', 'ejs');

app.get('/', (req, res)=>{
    res.render('pages/index', {test : 'salut'});
});

app.listen(8080);
=======
let express = require('express');
let app = express();
let bodyParser = require('body-parser');
let session = require('express-session')
//moteur de template
app.set('view engine', 'ejs');

//midellware
app.use('/asset',express.static('public'));
app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded
app.use(session({
    secret: 'ahoren',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false }
}));

app.use(require('./middelwares/flash'))


//Routes
app.get('/', (req, res)=>{
    let Publication = require('./models/publication')
    Publication.all(function(publications){
        res.render('pages/index', {publications:publications});
    });
    
});

app.post('/', (req, res)=>{

   if(req.body.publication === undefined || req.body.publication === '')
   {
       req.flash('error', "vous n'avez pas entrez de message");
       res.redirect('/');
   }
   else{
       let Publication = require('./models/publication')
       Publication.create(req.body.publication, function(){
           req.flash('success', "Merci!!!!");
           res.redirect('/');
       })
   }
});

app.get('/publication/:id', (req, res)=>{
    let Publication = require('./models/publication');
    Publication.find(req.params.id, function(publication){
        res.render('publications/show', {publication: publication})
    });
});

app.listen(3000);

 
>>>>>>> AddPublic
