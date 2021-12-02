const express = require('express');
const { engine } = require ('express-handlebars');

const app = express();

app.engine('handlebars', engine());
app.set('view engine', 'handlebars');
app.set("views", "./views");

app.get('/', (req, res) => {
    res.render('homepage');
});

app.listen(3001, () => {
    console.log(`App listening to port`, 3001);
})

/* function for when API is ready */
/* const API = () => ''; */
