const express = require("express");
const app = express();
const port = process.env.PORT || 8000;
const CONFIG = require('./config.json');


app.use(express.urlencoded());
app.set('view engine', 'ejs');

//open routes
app.use((req, res, next) => {

    if(req.query.token === CONFIG.TOKEN) {
        next();
    } else {
        res.status(401).send('Unauthorized');
    }
});

app.get('/', (req, res, next) => {
    res.render('index.ejs', req.query);
});

app.use(express.static("public"));


app.use('/companies', require('./backend/companies-router'))

app.listen(port, () => console.log(`Server running on port ${port}`));
