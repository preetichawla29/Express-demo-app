const express = require('express');
const path = require('path');
const exphbs = require('express-handlebars');
var request = require('request');
const app = express()

// Configure Handlebars
app.engine('.hbs', exphbs.engine({ 
   extname: 'hbs', 
   defaultLayout: 'main', 
   layoutDir: __dirname + '/views/layouts',
   partialsDir: path.join(__dirname, 'views/partials'),
}));
app.set('view engine', '.hbs');
app.set('views', path.join(__dirname, 'views'));

//Homepage
app.get('/', function (req, res, next) {
    res.render('home', {
        showTitle: true,
        img_src: true,

        // helper only for this rendering.
        helpers: {
            img_src: ('https://miro.medium.com/v2/resize:fit:1400/format:webp/1*GZERaorN5x2x23N8x-rA3w.png'),
            width: 1000
        }
    });
});

//About us Page
app.get("/about-us", (req, res) => { 
    res.render("about-us", {    
        name: "Preeti Chawla", 
        profile: "Technical Lead",
        company: "Srijan Material +",
        body: "Hello "
    });
});

//Faq Page
app.get("/faqs", (req, res) => {
  res.render('faqs')
})

//User Api
app.get('/api/users', function(req, res) {
  request({
      url: 'https://jsonplaceholder.typicode.com/users', //URL to hit
      method: 'GET', // specify the request type
      headers: { // speciyfy the headers
          'Content-Type': 'MyContentType',
          'Custom-Header': 'Custom Value'
      },
  },function(error, response, data){
      if (!error && response.statusCode == 200) {
        console.log(data)
      }
      // res.send(response.body);
      var bodyJSON = JSON.parse(response.body)
       res.render('users', {
        users: bodyJSON
      })
    }
  );
 
});
const port = 3000
app.listen(port, () => {
  console.log(`Server started on port ${port}`)
})