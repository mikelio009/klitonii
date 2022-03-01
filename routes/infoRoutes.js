const express = require("express");
const res = require("express/lib/response");
// const foodModel = require("../models/food");
const pronatModel = require("../models/pronat");
const app = express();
var bodyParser = require("body-parser");
const { name } = require("ejs");

app.use(express.static('public'))

app.use(bodyParser.urlencoded({ extended: false }));

// Marrja e te gjithe elementeve nga db edhe shfaqja e tyre ne ejs.
app.get("/pronat", async (request, response) => {
  const pronat = await pronatModel.find({});

  try {
    response.render('home',{pronat:pronat})
  } catch (error) {
    response.status(500).send(error);
  }
});

// Krijimi i homepage

app.get("/", async (request, response) => {

  const pronat = await pronatModel.find({});
  response.render('home',{pronat:pronat})
});

// Krijimi i search engine

app.get("/kerkooo", async function(request, response){
  const vepriminame = request.query.veprimi;
  const kategoritename = request.query.kategorite;
  const qytetiname = request.query.qyteti;

  pronatModel.find({ veprimi : vepriminame, kategorite : kategoritename, qyteti: qytetiname}, function(err, pronat){
    if (err) return handleError(err);

    try {
      response.render('kerkimi', {pronat:pronat})
    } catch (error) {
      response.status(500).send(error);
    }
  })

})

// Krijimi i rrethnesh
app.get("/rrethnesh", async (request, response) => {

  response.render('rrethnesh')
});
// Krijimi i qira
app.get("/qira", async (request, response) => {
  const pronat = await pronatModel.find({'veprimi':'qira'});

  response.render('qira', {pronat:pronat})
});
// Krijimi i shitje
app.get("/shitje", async (request, response) => {

  response.render('shitje')
});
// Krijimi i nje file te ri ne db
app.get("/add",async(request,response)=>{
  var prone = new pronatModel({name: "Prona 9", nr: "+355692020002" ,   price : 250 , veprimi: "shitje", kategorite : 'dyqane', qyteti: 'tirane'});
  
  // ruajtja ne db
  prone.save(function(err, emri_ri){
    if(err) return console.error(err);
    console.log(emri_ri.name + " U shtua ne db");
  })
});

// Gjetja e vetem nje prej elementeve edhe shfaqja e tij ne ejs

app.get("/find", async function(request, response){
  pronatModel.find({'name': 'Prona 3'}, function(err, pronat){
    if (err) return handleError(err);


    // Ketu shqaf home edhe pronen te cilen ka vetem emrin Prona 3 ne kete rast.
    try {
      response.render('home',{pronat:pronat})
    } catch (error) {
      response.status(500).send(error);
    }
  })

})

// Fshirja nga db e collection files

app.get("/del", async function(request, response){
  pronatModel.remove({}, function(err, pronat){
    if (err) return console.log(err);
    response.redirect('/pronat');
  })
})

// Krijimi i latest posts
app.get("/latest", async (request, response) => {
  const pronat = await pronatModel.find().sort({ _id: -1 }).limit(8);

  response.render('home', {pronat:pronat})
});




app.use(express.static('public'));
app.use("/css",express.static(__dirname + "public/css"));
app.use("/js",express.static(__dirname + "public/js"));
app.use("/image",express.static(__dirname + "public/image"));

// app.get('/' , (req,res) => {
//   res.render('home',{text:'CMIMI 250$'});
// })


module.exports = app;
